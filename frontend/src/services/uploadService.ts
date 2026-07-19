import axios from "axios";
import { ValidationResult } from "../types/validation";

const API_URL = "http://127.0.0.1:8000";

export const validateExcel = async (
  file: File
): Promise<ValidationResult> => {

  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post(
    `${API_URL}/api/upload/excel`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};