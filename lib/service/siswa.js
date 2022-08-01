import ServiceAdapter from ".";

export async function getSiswa(query = "") {
  const { data: response } = await ServiceAdapter().get(`/siswa?${query}`);
  return response;
}
