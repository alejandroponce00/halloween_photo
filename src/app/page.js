"use client";
import React from "react";

function HomePage() {
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const response = await fetch("/api/upload", {
            method: "POST",
          });
          
          const data = await response.json();
          console.log(data);
        }}
      >
        <input
          type="file"
          onChange={(e) => {
            console.log(e.target.files[0]);
          }}
        />
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default HomePage;
