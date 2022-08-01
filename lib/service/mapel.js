import ServiceAdapter from ".";

export async function getMapel(query = "") {
  const { data: response } = await ServiceAdapter().get(
    `/mata-pelajaran?${query}`
  );
  return response;
}
