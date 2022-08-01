import ServiceAdapter from ".";

async function deleteService(url, id) {
  const { data: response } = await ServiceAdapter().delete(`${url}/${id}`, {
    headers: {
      Authorization: "Bearer 38|ttX5qF9YX0cawYLuUAYE30pQDiFPlA7PndDhqBMK",
    },
  });
  return response;
}

export default deleteService;
