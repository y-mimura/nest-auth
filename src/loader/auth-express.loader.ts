/**
 * CommonJSで動作するアプリケーションなので、ESMで書かれたパッケージは動的にimportする必要がある。
 * このファイルでは `@auth/express` に対して動的なimportを提供する。
 */

// @ts-expect-error @auth/express
type ExpressAuth = typeof import('@auth/express').ExpressAuth;
let expressAuth: ExpressAuth;
// @ts-expect-error @auth/express/providers/email
type EmailProvider = typeof import('@auth/express/providers/email').default;
let expressEmailProvider: EmailProvider;

export const loadExpressAuth = async () => {
  if (!expressAuth) {
    expressAuth = (await eval(`import('@auth/express')`)).ExpressAuth;
  }
  return expressAuth;
};

export const loadExpressEmailProvider = async () => {
  if (!expressEmailProvider) {
    expressEmailProvider = (
      await eval(`import('@auth/express/providers/email')`)
    ).default;
  }
  return expressEmailProvider;
};
