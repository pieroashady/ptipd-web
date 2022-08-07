import ServiceAdapter from '.';

export async function getUser(token) {
  const { data: response } = await ServiceAdapter().get(`/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
