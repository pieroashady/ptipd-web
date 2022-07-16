import Axios from "axios";
import APP_CONFIG from "../../app.config";

function ServiceAdapter() {
  return Axios.create({
    baseURL: APP_CONFIG.baseUrl,
    responseType: "json",
  });
}

export default ServiceAdapter;
