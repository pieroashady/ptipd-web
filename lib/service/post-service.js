import ServiceAdapter from ".";

export async function postService(url, data) {
  const { data: response } = await ServiceAdapter().post(url, data, {
    headers: {
      Authorization: "Bearer 38|ttX5qF9YX0cawYLuUAYE30pQDiFPlA7PndDhqBMK",
    },
  });
  return response;
}
