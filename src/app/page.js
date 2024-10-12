"use client";
import React, { useState } from "react";

function HomePage() {
  const [file, setFiles] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [transformedUrl, setTransformedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Por favor selecciona un archivo");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error en la subida de la imagen");
      }

      const data = await response.json();
      setImageUrl(data.url);

      // Comienza la transformación de la imagen
      setGenerating(true);

      // Manipulación de la URL para agregar fondo de Halloween
      const halloweenBackgroundUrl = `${data.url.replace(
        "/upload/",
        "/upload/e_gen_background_replace:prompt_Pon%20un%20fondo%20terror%20de%20halloween%20c_scale,w_800/"
      )}`;
      
      setTransformedUrl(halloweenBackgroundUrl);
    } catch (err) {
      console.error(err);
      setError("Hubo un problema subiendo la imagen");
    } finally {
      setLoading(false);
      setGenerating(false);
    }
  };

  return (
    <div className="p-4 mx-10 ">
      <h1 className="text-5xl text-center text-slate-300">Photo Halloween</h1>
      <div className="my-10 fixed  ">
      <form onSubmit={handleSubmit} >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setFiles(e.target.files[0]);
          }}
          className="border border-gray-300 rounded p-2 mr-2"
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white rounded p-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Subiendo..." : "Enviar"}
        </button>
      </form></div>

      {error && <p className="text-red-500">{error}</p>}

      {imageUrl && transformedUrl && (
        <div className="flex justify-between mt-4 mx-10">
          <div className="text-center">
            <h3 className="py-5 text-slate-400 font-bold">Imagen original </h3>
            <img src={imageUrl} alt="Imagen original" className="max-w-full h-auto" />
          </div>
          <div className="text-center">
            {generating && <p>Generando imagen con fondo de Halloween...</p>}
            <h3 className="py-5 text-slate-400 font-bold">Imagen con fondo de Halloween:</h3>
            <img src={transformedUrl} alt="Imagen con fondo de Halloween" className="max-w-full h-auto" />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
