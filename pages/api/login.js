import { loginService } from "../../lib/service/login";
import { withSessionRoute } from "../../lib/session/withSession";

export default withSessionRoute(loginRoute);

async function loginRoute(req, res) {
  try {
    const response = await loginService(req.body);
    const { data } = response;

    if (data.role === "siswa") {
      return res.status(500).json({
        success: false,
        message: "Not Authorized",
      });
    }

    req.session.user = {
      user_id: data.id,
      role: data.role,
      token: data.token,
    };

    await req.session.save();

    return res.json({
      success: true,
      message: "Berhasil login",
    });
  } catch (error) {
    return res.status(500).json(error.response.data);
  }
}
