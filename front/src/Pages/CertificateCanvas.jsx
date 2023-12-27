import React, { useEffect, useState } from "react";
// import imagemin from 'imagemin';
// import imageminPngquant from 'imagemin-pngquant';


const CertificateCanvas = ({ data, handleCanvasRef }) => {

  const {_id, name, type, course } = data;
  
  useEffect(() => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Load and draw image to fit the canvas
    const img = new Image();
    // img.setAttribute('crossorigin', 'anonymous');
    img.crossOrigin = "anonymous";
    img.onload = function () {
      // Calculate the scale factor to fit the image within the canvas
      const scaleFactor = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );

      // Calculate the new dimensions for the image
      const newWidth = img.width * scaleFactor;
      const newHeight = img.height * scaleFactor;

      // Calculate the position to center the image on the canvas
      const x = (canvas.width - newWidth) / 2;
      const y = (canvas.height - newHeight) / 2;

      
      ctx.drawImage(img, x, y, newWidth, newHeight);

      drawContent();
      

      try {

        localStorage.setItem(
          "certificate-image",
          canvas.toDataURL("image/png")
        );
      } catch (err) {
        console.error(`Error saving image to localStorage: ${err}`);
      }


      handleCanvasRef(canvas);
    };
   
    img.src = require("./log.png");
    
    

    // Replace with the actual path to your image

    function drawContent() {
      // Styles for text drawing
      ctx.font = "italic bold 0.8rem Arial";
      ctx.fillStyle = "GRAY";
      ctx.fillText(`ID:${_id}`, 600, 20);
      ctx.font = "20px Arial";
      ctx.fillStyle = "#1DA1F2";
      ctx.fillText("byte", canvas.width - 77, 50);
      ctx.font = "20px Arial";
      ctx.fillStyle = "red";
      ctx.fillText("XL", canvas.width - 40, 50);
      // Draw your HTML content onto the canvas
      ctx.textAlign = "end";
      // ctx.fillText("byte", canvas.width - 50, 50);
      ctx.font = "bold 4rem Arial";
      ctx.fillStyle = "#1DA1F2";
      ctx.fillText("Certificate", canvas.width - 120, 120);
      ctx.font = "bold 2rem Arial";
      ctx.fillStyle = "#F26E1C";
      ctx.fillText("of", canvas.width - 250, 160);
      ctx.fillStyle = "#1DA1F2";
      ctx.fillText(`${type}`, canvas.width - 160, 200);
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.fillText("This is to certify that", canvas.width - 170, 240);
      ctx.font = "bold auto Arial";
      ctx.fillStyle = "#F26E1C";
      ctx.fillText(`${name}`, canvas.width - 210, 300);
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(
        "has successfully cleared the assessment for the skill",
        canvas.width - 30,
        340
      );
      ctx.font = "italic bold 1.42rem Arial";
      ctx.fillStyle = "#F26E1C";
      ctx.fillText(`${course}`, 660, 380);

      // Draw footer
      ctx.textAlign = "start";
      ctx.font = "15px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(
        new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        350,
        canvas.height - 100
      );
      ctx.font = "15px Arial";
      ctx.fillStyle = "#F26E1C";
      ctx.fillText(
        "Date of Achievement",
        canvas.width - 470,
        canvas.height - 80
      );
      // ctx.drawImage(img, canvas.width - 170, canvas.height - 150, 50, 40);
      //   ctx.font = "15px Arial";
      //   ctx.fillStyle = "black";
      //   ctx.fillText(
      //     "Karun Tadepalli",
      //     canvas.width - 200,
      //     canvas.height - 100
      //   );
      //   ctx.font = "italic 15px Arial";
      //   ctx.fillStyle = "#F26E1C";
      //   ctx.fillText(
      //     "CEO & Co-founder",
      //     canvas.width - 210,
      //     canvas.height - 80
      //   );

      // Draw the image
      const img = new Image();
      img.onload = function () {
        ctx.drawImage(img, canvas.width - 170, canvas.height - 150, 50, 40);
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(
          "Karun Tadepalli",
          canvas.width - 200,
          canvas.height - 100
        );
        ctx.font = "italic 15px Arial";
        ctx.fillStyle = "#F26E1C";
        ctx.fillText(
          "CEO & Co-founder",
          canvas.width - 210,
          canvas.height - 80
        );
      };
      img.src =require("./sign.webp") // Replace with the actual path to your image
    }
  }, [handleCanvasRef]);


  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <canvas
        id="myCanvas"
        width="800"
        height="560"
        style={{ border: "1px solid #000" }}
      ></canvas>
    </div>
  );
};

export default CertificateCanvas;
