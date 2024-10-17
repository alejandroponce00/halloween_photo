"use client";
import React, { useState, useEffect } from "react";
import Fondo from "./components/fondo/fondo";

function HomePage() {
  const [file, setFiles] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [transformedUrl, setTransformedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(20); // Nuevo estado para el temporizador
  const [isCounting, setIsCounting] = useState(false); // Para controlar el inicio de la cuenta regresiva

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

      // Inicia la cuenta regresiva de 20 segundos
      setIsCounting(true);
      setTimer(20);

      // Manipulación de la URL para agregar fondo de Halloween
      const halloweenBackgroundUrl = `${data.url.replace(
        "/upload/",
        "/upload/e_gen_background_replace:prompt_Pon%20un%20fondo%20de%20terror%20ambientado%20en%20halloween%20con%20niebla%20c_scale,w_800/"
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

  // Hook para la cuenta regresiva
  useEffect(() => {
    let interval = null;

    if (isCounting && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsCounting(false); // Detener la cuenta regresiva cuando llegue a 0
    }

    return () => clearInterval(interval);
  }, [isCounting, timer]);

  return (
    <div className="p-4 mx-10">
      <Fondo />
      <h1 className="text-8xl text-center text-red-800 font-bold">Photo Halloween</h1>
      <div className="flex justify-center my-10">
        <form onSubmit={handleSubmit} className="text-white my-4  shadow-md">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFiles(e.target.files[0]);
            }}
            className="border border-gray-300 rounded p-2 mr-2 bg-white shadow-md hover:bg-red-800"
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-orange-600 text-white rounded p-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Subiendo..." : "Enviar"}
          </button>
        </form>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {imageUrl && transformedUrl && (
        <div className="flex justify-between mt-10">
          <div className="w-1/2 text-left">
            <h3 className="py-2 text-red-200/40  text-center text-5xl">Imagen original</h3>
            <img src={imageUrl} alt="Imagen original" className="w-full block max-h-screen object-cover border-double  border-2 border-sky-500 p-3"  />
          </div>
          <div className="w-1/2 text-center">
            {generating && <p>Generando imagen con fondo de Halloween...</p>}

            {/* Mostrar la cuenta regresiva si está en progreso */}
            {isCounting && (
              <p className="text-2xl font-bold text-yellow-500">
                La imagen estará lista en: {timer} segundos
              </p>
            )}

            <h3 className="py-2 text-red-400/50 text-center text-5xl">Imagen con fondo de Halloween</h3>
            <img
              src={transformedUrl}
              alt="Imagen con fondo de Halloween"
              className="w-full block max-h-screen object-cover border-double  border-2 border-red-500 p-3 "
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
