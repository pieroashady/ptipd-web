import ServiceAdapter from ".";

export async function getJadwalMapel(query = "") {
  const { data: response } = await ServiceAdapter().get(
    `/jadwal-mapel?${query}`
  );
  return response;
}
