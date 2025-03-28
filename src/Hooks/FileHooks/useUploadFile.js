import Axios from "../../Config/Axios";

const uploadFile = async ({ file, modelType, refId }) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    console.log("file", file);
    console.log("model type ", modelType);
    console.log("ref id", refId);
    const response = await Axios.post(
      `/file/addFile/${modelType}/${refId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("response from upload file ", response);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
export default uploadFile;
