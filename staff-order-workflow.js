(function () {
  'use strict';

  const ACTIVE_STATUSES = new Set([
    'new',
    'accepted',
    'preparing',
    'ready'
  ]);

  const HISTORY_STATUSES = new Set([
    'collected',
    'cancelled',
    'returned',
    'refunded'
  ]);

  const NEXT_ACTIONS = Object.freeze({
    new: ['accepted', '✓ Przyjmij'],
    accepted: ['preparing', '👩‍🍳 Robimy'],
    preparing: ['ready', '✅ Gotowe'],
    ready: ['collected', '🛍️ Wydane']
  });

  const HISTORY_ACTIONS = Object.freeze({
    collected: ['returned', '↩ Oznacz zwrot'],
    returned: ['refunded', '💳 Oznacz refundację']
  });

  function filterOrders(list, filter) {
    if (filter === 'all') {
      return list.filter(order =>
        HISTORY_STATUSES.has(order.status)
      );
    }
    if (filter === 'new') {
      return list.filter(order =>
        order.status === 'new'
      );
    }
    if (filter === 'ready') {
      return list.filter(order =>
        order.status === 'ready'
      );
    }
    if (filter === 'preparing') {
      return list.filter(order =>
        ['accepted', 'preparing'].includes(
          order.status
        )
      );
    }
    return list.filter(order =>
      ACTIVE_STATUSES.has(order.status)
    );
  }

  window.StaffOrderWorkflow = Object.freeze({
    ACTIVE_STATUSES,
    HISTORY_STATUSES,
    filterOrders,
    nextAction(status) {
      return NEXT_ACTIONS[status] || null;
    },
    historyAction(status) {
      return HISTORY_ACTIONS[status] || null;
    }
  });
})();
