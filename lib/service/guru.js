import ServiceAdapter from ".";

export async function getTeachers(query = "") {
  const { data: response } = await ServiceAdapter().get(`/guru`);
  return response;
}
