import api from "./api";

export const uploadPhoto = async (fileOrFormData) => {
  let body;

  // 🔄 Check if the calling component already passed a structured FormData object
  if (fileOrFormData instanceof FormData) {
    body = fileOrFormData;
  } else {
    // Fallback: If it's a raw file object, wrap it using the "file" key name
    body = new FormData();
    body.append("file", fileOrFormData);
  }

  const response = await api.post("/camera/upload", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};