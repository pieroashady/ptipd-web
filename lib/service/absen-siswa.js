import ServiceAdapter from ".";

export async function getAbsenSiswa(query = "") {
  const { data: response } = await ServiceAdapter().get(
    `/absen-siswa?${query}`
  );
  return response;
}
