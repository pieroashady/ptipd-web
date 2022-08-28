import ServiceAdapter from '.';

export async function getJadwalMapel(query = '') {
  const { data: response } = await ServiceAdapter().get(`/jadwal-mapel?${query}`);
  return response;
}

export async function getJadwalMapelById(id) {
  const { data: response } = await ServiceAdapter().get(`/jadwal-mapel/${id}`);
  return response;
}
