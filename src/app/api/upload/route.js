import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configuración
cloudinary.config({
  cloud_name: "dtyjtnqoa",
  api_key: "346473562463378",
  api_secret: "Xk8uBG4kqsk_hmRul90oGL4XHJA", // ⚠️ Evita exponer las claves API en el código
});

export async function POST(request) {
  try {
    const data = await request.formData();
    const image = data.get("image");

    if (!image) {
      return NextResponse.json({ message: "No se ha subido imagenes" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({}, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }).end(buffer);
    });

    console.log(response);

    return NextResponse.json({
      message: "Imagen subida",
      url: response.secure_url,
    });

  } catch (error) {
    console.error("Error en la subida de imagen: ", error);
    return NextResponse.json({ message: "Error subiendo la imagen" }, { status: 500 });
  }
}
