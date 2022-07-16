import ServiceAdapter from ".";

export async function getKelas(query = "") {
  const { data: response } = await ServiceAdapter().get(`/kelas`);
  return response;
}
