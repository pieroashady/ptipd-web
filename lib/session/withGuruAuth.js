import { withSessionSsr } from "./withSession";

const withGuruAuth = (gssp) =>
  withSessionSsr(async (context) => {
    const user = context.req.session.user;
    // you can check the user in your DB here
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/authentication/login",
        },
      };
    }

    console.log(user.role);

    if (user.role != "guru") {
      return {
        redirect: {
          permanent: false,
          destination: "/authentication/login",
        },
      };
    }

    return await gssp(context);
  });

export default withGuruAuth;
