import ServiceAdapter from '.';

export async function getQrCode(query = {}) {
  console.log(query);
  const { data: response } = await ServiceAdapter().get(`/qr`, {
    params: query,
  });
  return response;
}
