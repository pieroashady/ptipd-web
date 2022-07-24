import ServiceAdapter from ".";

export async function getAbsenSiswa(query = "") {
  const { data: response } = await ServiceAdapter().get(
    `/absen-siswa?sort=created_at,desc&${query}`
  );
  return response;
}
