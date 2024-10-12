import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

import path from "path";
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: "dtyjtnqoa",
  api_key: "346473562463378",
  api_secret: "Xk8uBG4kqsk_hmRul90oGL4XHJA", // Click 'View API Keys' above to copy your API secret
});

export async function POST(request) {
  const data = await request.formData();
  const image = data.get("image");
  if (!image) {
    return NextResponse.json("no se ha subido imagenes", { status: 400 });
  }
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

 const response = await new Promise((resolve,reject) => {

  cloudinary.uploader
    .upload_stream({}, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
    .end(buffer);
});
console.log(response   )

  return NextResponse.json({
    message: "imagen subida",
    url: response.secure_url,
  });
}
