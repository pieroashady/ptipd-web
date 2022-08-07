import { useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";

const useLogin = () => {
  const router = useRouter();
  const [state, setState] = useState({
    loading: false,
  });

  const handleLoading = (status) => {
    setState((prevState) => ({
      ...prevState,
      loading: status,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    handleLoading(true);

    const { target } = event;
    const { username, password } = target;

    const data = {
      username: username.value,
      password: password.value,
    };

    try {
      const { data: response } = await Axios.post("/api/login", data);
      if (response.data.role === "guru") {
        await router.replace("/guru/absen");
        return;
      }
      router.replace("/home");
    } catch (error) {
      handleLoading(false);
      alert(error.response.data.message);
      return;
    }
  };

  return {
    loading: state.loading,
    handleLogin,
  };
};

export default useLogin;
