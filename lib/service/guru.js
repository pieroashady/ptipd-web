import ServiceAdapter from ".";

export async function getTeachers(query = "") {
  const { data: response } = await ServiceAdapter().get(
    `/guru?sort=created_at,desc`
  );
  return response;
}
