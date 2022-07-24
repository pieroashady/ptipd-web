import { useState } from "react";
import { updateService } from "../../lib/service/update-service";

const useUpdate = () => {
  const [data, setData] = useState({});

  const handleSetData = (value) => {
    setData(value);
  };

  const handleUpdate = async (url, id, data) => {
    await updateService(url, id, data);
  };

  return {
    handleSetData,
    handleUpdate,
  };
};

export default useUpdate;
