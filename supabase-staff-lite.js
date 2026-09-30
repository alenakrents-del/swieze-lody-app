(() => {
  'use strict';

  const safeJson = text => {
    if (!text) return null;
    try { return JSON.parse(text); } catch (_) { return text; }
  };

  const errorFrom = (payload, status) => {
    const message =
      payload?.msg ||
      payload?.message ||
      payload?.error_description ||
      payload?.error ||
      `HTTP ${status}`;

    const error = new Error(String(message));
    error.status = status;
    error.details = payload;
    return error;
  };

  const jwtExp = token => {
    try {
      const part = String(token || '').split('.')[1];
      if (!part) return 0;

      const normalized = part
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const padded =
        normalized +
        '='.repeat((4 - normalized.length % 4) % 4);

      return Number(
        JSON.parse(atob(padded)).exp || 0
      );
    } catch (_) {
      return 0;
    }
  };

  window.supabase = {
    createClient(baseUrl, apiKey, options = {}) {
      const storageKey =
        options?.auth?.storageKey ||
        'swieze-lody-staff-auth';

      const listeners = new Set();

      let pendingRecovery = false;
      let refreshPromise = null;

      const readSession = () => {
        try {
          const raw = localStorage.getItem(storageKey);
          const parsed = raw
            ? JSON.parse(raw)
            : null;

          return parsed?.access_token
            ? parsed
            : null;
        } catch (_) {
          return null;
        }
      };

      const writeSession = session => {
        if (!session?.access_token) return;

        if (!session.expires_at) {
          session.expires_at =
            jwtExp(session.access_token) ||
            (
              session.expires_in
                ? Math.floor(Date.now() / 1000) +
                  Number(session.expires_in)
                : 0
            );
        }

        localStorage.setItem(
          storageKey,
          JSON.stringify(session)
        );
      };

      const clearSession = () => {
        localStorage.removeItem(storageKey);
      };

      const emit = (
        event,
        session = readSession()
      ) => {
        listeners.forEach(callback => {
          try {
            callback(event, session);
          } catch (error) {
            console.error(error);
          }
        });
      };

      const rawRequest = async (
        path,
        {
          method = 'GET',
          body,
          token
        } = {}
      ) => {
        const headers = {
          apikey: apiKey,
          Authorization: `Bearer ${token || apiKey}`
        };

        if (body !== undefined) {
          headers['Content-Type'] =
            'application/json';
        }

        const response = await fetch(
          `${baseUrl}${path}`,
          {
            method,
            headers,
            body:
              body === undefined
                ? undefined
                : JSON.stringify(body),
            cache: 'no-store'
          }
        );

        const text =
          await response.text();

        const payload =
          safeJson(text);

        if (!response.ok) {
          throw errorFrom(
            payload,
            response.status
          );
        }

        return payload;
      };

      const refreshSession = async () => {
        if (refreshPromise) {
          return refreshPromise;
        }

        const current =
          readSession();

        if (!current?.refresh_token) {
          return null;
        }

        refreshPromise = (async () => {
          try {
            const next =
              await rawRequest(
                '/auth/v1/token?grant_type=refresh_token',
                {
                  method: 'POST',
                  token: apiKey,
                  body: {
                    refresh_token:
                      current.refresh_token
                  }
                }
              );

            writeSession(next);
            emit(
              'TOKEN_REFRESHED',
              next
            );

            return next;
          } catch (error) {
            if (
              error?.status === 400 ||
              error?.status === 401
            ) {
              clearSession();
              emit(
                'SIGNED_OUT',
                null
              );
            }

            throw error;
          } finally {
            refreshPromise = null;
          }
        })();

        return refreshPromise;
      };

      const validSession = async () => {
        const session =
          readSession();

        if (!session) {
          return null;
        }

        const exp = Number(
          session.expires_at ||
          jwtExp(session.access_token) ||
          0
        );

        if (
          !exp ||
          exp >
            Math.floor(Date.now() / 1000) +
            30
        ) {
          return session;
        }

        try {
          return await refreshSession();
        } catch (_) {
          return readSession();
        }
      };

      const authedRequest = async (
        path,
        options = {}
      ) => {
        let session =
          await validSession();

        let token =
          session?.access_token ||
          apiKey;

        try {
          return await rawRequest(
            path,
            {
              ...options,
              token
            }
          );
        } catch (error) {
          if (
            error?.status !== 401 ||
            !session?.refresh_token
          ) {
            throw error;
          }

          session =
            await refreshSession();

          token =
            session?.access_token ||
            apiKey;

          return rawRequest(
            path,
            {
              ...options,
              token
            }
          );
        }
      };

      const fromRecoveryHash = () => {
        const params =
          new URLSearchParams(
            window.location.hash.replace(
              /^#/,
              ''
            )
          );

        if (
          params.get('type') !==
          'recovery'
        ) {
          return;
        }

        const accessToken =
          params.get('access_token');

        const refreshToken =
          params.get('refresh_token');

        if (!accessToken) return;

        const session = {
          access_token: accessToken,
          refresh_token:
            refreshToken || '',
          token_type:
            params.get('token_type') ||
            'bearer',
          expires_in: Number(
            params.get('expires_in') ||
            3600
          ),
          expires_at:
            jwtExp(accessToken) ||
            Math.floor(
              Date.now() / 1000
            ) +
              Number(
                params.get(
                  'expires_in'
                ) || 3600
              )
        };

        writeSession(session);
        pendingRecovery = true;
      };

      fromRecoveryHash();

      const auth = {
        async getSession() {
          const session =
            await validSession();

          return {
            data: { session },
            error: null
          };
        },

        async signInWithPassword({
          email,
          password
        }) {
          try {
            const session =
              await rawRequest(
                '/auth/v1/token?grant_type=password',
                {
                  method: 'POST',
                  token: apiKey,
                  body: {
                    email,
                    password
                  }
                }
              );

            writeSession(session);

            emit(
              'SIGNED_IN',
              session
            );

            return {
              data: {
                user:
                  session.user ||
                  null,
                session
              },
              error: null
            };
          } catch (error) {
            return {
              data: {
                user: null,
                session: null
              },
              error
            };
          }
        },

        async signOut() {
          const session =
            readSession();

          try {
            if (
              session?.access_token
            ) {
              await rawRequest(
                '/auth/v1/logout',
                {
                  method: 'POST',
                  token:
                    session.access_token
                }
              );
            }
          } catch (_) {}

          clearSession();

          emit(
            'SIGNED_OUT',
            null
          );

          return {
            error: null
          };
        },

        async resetPasswordForEmail(
          email,
          options = {}
        ) {
          try {
            const redirectTo =
              options.redirectTo ||
              `${window.location.origin}/staff.html`;

            const query =
              new URLSearchParams({
                redirect_to:
                  redirectTo
              }).toString();

            const data =
              await rawRequest(
                `/auth/v1/recover?${query}`,
                {
                  method: 'POST',
                  token: apiKey,
                  body: { email }
                }
              );

            return {
              data,
              error: null
            };
          } catch (error) {
            return {
              data: null,
              error
            };
          }
        },

        async updateUser(
          attributes
        ) {
          try {
            const session =
              await validSession();

            if (
              !session?.access_token
            ) {
              throw new Error(
                'No active session'
              );
            }

            const user =
              await authedRequest(
                '/auth/v1/user',
                {
                  method: 'PUT',
                  body: attributes
                }
              );

            return {
              data: { user },
              error: null
            };
          } catch (error) {
            return {
              data: {
                user: null
              },
              error
            };
          }
        },

        onAuthStateChange(
          callback
        ) {
          listeners.add(callback);

          if (pendingRecovery) {
            pendingRecovery = false;

            queueMicrotask(() =>
              callback(
                'PASSWORD_RECOVERY',
                readSession()
              )
            );
          }

          return {
            data: {
              subscription: {
                unsubscribe() {
                  listeners.delete(
                    callback
                  );
                }
              }
            }
          };
        }
      };

      const rpc = async (
        name,
        args = {}
      ) => {
        try {
          const data =
            await authedRequest(
              `/rest/v1/rpc/${encodeURIComponent(name)}`,
              {
                method: 'POST',
                body: args
              }
            );

          return {
            data,
            error: null
          };
        } catch (error) {
          return {
            data: null,
            error
          };
        }
      };

      return {
        auth,
        rpc
      };
    }
  };
})();
