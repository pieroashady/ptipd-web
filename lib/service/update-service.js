import ServiceAdapter from ".";

export async function updateService(url, id, data) {
  const { data: response } = await ServiceAdapter().put(`${url}/${id}`, data, {
    headers: {
      Authorization: "Bearer 38|ttX5qF9YX0cawYLuUAYE30pQDiFPlA7PndDhqBMK",
    },
  });
  return response;
}
