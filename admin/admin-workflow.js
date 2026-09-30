export const ACTIVE_STATUSES = new Set(['new','accepted','preparing','ready']);
export const HISTORY_STATUSES = new Set(['collected','cancelled','returned','refunded']);
export const STATUS_LABELS = Object.freeze({new:'Nowe',accepted:'Przyjęte',preparing:'W przygotowaniu',ready:'Gotowe',collected:'Wydane',cancelled:'Anulowane',returned:'Zwrócone',refunded:'Zrefundowane'});
const NEXT = Object.freeze({new:['accepted','Przyjmij'],accepted:['preparing','Rozpocznij'],preparing:['ready','Gotowe'],ready:['collected','Wydaj']});
const HISTORY_NEXT = Object.freeze({collected:['returned','Oznacz zwrot'],returned:['refunded','Oznacz refundację']});
export function nextAction(status){return NEXT[status]||null}
export function historyAction(status){return HISTORY_NEXT[status]||null}
export function isStale(order,now=Date.now()){return ACTIVE_STATUSES.has(order.status)&&now-new Date(order.created_at).getTime()>86400000}
export function filterOrders(orders,filter){if(filter==='history')return orders.filter(o=>HISTORY_STATUSES.has(o.status));if(filter==='new'||filter==='ready')return orders.filter(o=>o.status===filter);if(filter==='preparing')return orders.filter(o=>o.status==='accepted'||o.status==='preparing');return orders.filter(o=>ACTIVE_STATUSES.has(o.status))}
