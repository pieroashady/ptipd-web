import { useState } from "react";
import { postService } from "../../lib/service/post-service";

const useCreateData = () => {
  const handleCreate = async (url, data) => {
    await postService(url, data);
  };

  return {
    handleCreate,
  };
};

export default useCreateData;
