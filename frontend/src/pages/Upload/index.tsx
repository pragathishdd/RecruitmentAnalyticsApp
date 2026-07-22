import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Upload() {


const API_URL =
  import.meta.env.VITE_API_URL;


  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const navigate =
    useNavigate();

  const uploadExcel = async () => {

    try {

      if (!file) {

        alert(
          "Please select an Excel file"
        );

        return;
      }

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const response =
        await axios.post(
          `${API_URL}/upload/excel`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      alert(
        `${response.data.rows} records uploaded successfully`
      );

      navigate(
        "/summary"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Error uploading file"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-[#0B1F41] mb-6">
          Recruitment Analytics Portal
        </h1>

        <div className="mb-6">

          <label className="block font-semibold mb-2">
            Recruitment Excel File
          </label>

          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => {

              if (
                e.target.files?.[0]
              ) {

                setFile(
                  e.target.files[0]
                );

              }

            }}
          />

        </div>

        <button
          onClick={uploadExcel}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
        >

          {loading
            ? "Uploading..."
            : "Upload Excel"}

        </button>

      </div>

    </div>

  );
}
