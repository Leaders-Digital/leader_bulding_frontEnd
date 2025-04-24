import Axios from "../../Config/Axios";

const uploadFile = async ({ file, modelType, refId }) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
   
    const response = await Axios.post(
      `/file/addFile/${modelType}/${refId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    
    return response.data;
  } catch (e) {
  
    throw e;
  }
};
export default uploadFile;
