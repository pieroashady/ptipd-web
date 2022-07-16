import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import APP_CONFIG from "../../app.config";

const sessionOptions = {
  password: APP_CONFIG.ironSessionPassword,
  cookieName: APP_CONFIG.ironSessionCookieName,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}
