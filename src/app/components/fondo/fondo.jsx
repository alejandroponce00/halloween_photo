import Image from 'next/image'
 
export default function Fondo() {
  return (
    <Image
          alt="fondo"
          src={"/imagenes/fondo_halloween.webp"}
          className="imagen blur-sm h-screen  bg-cover bg-center"
          // width={"560"}
          //height={"200"}
          fill={true}
        />
  )
}