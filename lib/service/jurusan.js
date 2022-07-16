import ServiceAdapter from ".";

export async function getJurusan(query = "") {
  const { data: response } = await ServiceAdapter().get(`/jurusan`);
  return response;
}
