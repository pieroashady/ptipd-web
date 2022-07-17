import ServiceAdapter from ".";

export async function getQrCode(query = "") {
  const { data: response } = await ServiceAdapter().get(`/qr`);
  return response;
}
