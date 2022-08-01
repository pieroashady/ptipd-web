import { withSessionRoute } from "../../lib/session/withSession";

async function logoutRoute(req, res) {
  await req.session.destroy();
  res.json({ logout: true });
}

export default withSessionRoute(logoutRoute);
