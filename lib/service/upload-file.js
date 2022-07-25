import ServiceAdapter from ".";

export async function uploadFile(file, options = {}) {
  const formData = new FormData();
  formData.append("image", file);

  const { data: response } = await ServiceAdapter().post("/upload", formData);
  return response;
}
