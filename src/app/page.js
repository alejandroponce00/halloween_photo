"use client";
import React, { useState } from "react";

function HomePage() {
  const [file, setFiles] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [transformedUrl, setTransformedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
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

      // Manipulación de la URL para agregar fondo de Halloween
      const halloweenBackgroundUrl = `${data.url.replace(
        "/upload/",
        "/upload/e_gen_background_replace:prompt_Pon%20un%20fondo%20de%20halloween/"
      )}`;
      console.log(data)

      setTransformedUrl(halloweenBackgroundUrl);
    } catch (err) {
      console.error(err);
      setError("Hubo un problema subiendo la imagen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setFiles(e.target.files[0]);
          }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Subiendo..." : "Enviar"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {imageUrl && (
        <div>
          <h3>Imagen original subida:</h3>
          <img src={imageUrl} alt="Imagen original" style={{ maxWidth: "100%" }} />
        </div>
      )}

      {transformedUrl && (
        <div>
          <h3>Imagen con fondo de Halloween:</h3>
          <img src={transformedUrl} alt="Imagen con fondo de Halloween" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
}

export default HomePage;
