import { getUser } from '../../lib/service/user';
import { withSessionRoute } from '../../lib/session/withSession';

async function userRoute(req, res) {
  try {
    const { user: userSession } = req.session;
    const response = await getUser(userSession.token);
    return res.json(response);
  } catch (error) {
    return res.json({ ok: false });
  }
}

export default withSessionRoute(userRoute);
