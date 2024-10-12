import { NextResponse } from "next/server";

import path from "path";



export async function POST(request){
    const data = await request.formData()
    const image = data.get("image")
    if (!image){
        return NextResponse.json("no se ha subido imagenes", {status: 400});
    }
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filePath = path.join(process.cwd(),'public', image.name)

    console.log(filePath)

    return NextResponse.json("imagen subida")
}