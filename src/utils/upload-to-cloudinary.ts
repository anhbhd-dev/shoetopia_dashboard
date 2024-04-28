import axiosInstance from "../apis/axios-initial";

export const uploadToCloudinary = async (file: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "dhlbsthy");

  axiosInstance
    .post(`https://api.cloudinary.com/v1_1/dfabxogw5/image/upload`, formData)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw new Error(error);
    });
};
