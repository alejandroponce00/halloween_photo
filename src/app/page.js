"use client";
import React, { useState } from "react";

function HomePage() {
  const [file, setFiles] = useState(null);
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData()
          formData.append('image', file)

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
           
          });

          const data = await response.json();
          console.log(data);
        }}
      >
        <input
          type="file"
          onChange={(e) => {
            setFiles(e.target.files[0]);
          }}
        />
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default HomePage;
