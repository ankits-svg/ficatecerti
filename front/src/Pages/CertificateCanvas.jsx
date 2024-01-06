import React, { useEffect, useState } from "react";


const CertificateCanvas = ({ data, handleCanvasRef }) => {
  const date1 = new Date();
  const showTime1 =
  date1.getHours() + ":" + date1.getMinutes() + ":" + date1.getSeconds();

  const {_id, name, type, course } = data;
  
  useEffect(() => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    // ctx.strokeStyle = "red";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    // console.log(canvas.width,canvas.height)
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
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
      
      // localStorage.setItem("certificate-image",canvas.toDataURL("image/png"));

      try {
        
        localStorage.setItem("certificate-image", canvas.toDataURL("image/png"), () => {
          localStorage.setItem('timetogeneratecanvas',showTime1)
          handleCanvasRef(canvas);
          
        });
      } catch (err) {
        console.error(`Error saving image to localStorage: ${err}`);
      }


      
    };
   
    img.src = require("./log.png");

    const sign = new Image();
    sign.src =require("./sign.webp")
    

    function truncateText(text, limit = 3) {
      const words = text.split(' ');
      if (words.length <= limit) {
        return text;
      }
      return words.slice(0, limit).join(' ') + '...';
    }

    function drawContent() {
      
      ctx.font = "italic bold 0.8rem Arial";
      ctx.fillStyle = "GRAY";
      ctx.fillText(`ID:${_id}`, 580, 20);
      ctx.font = "bold 20px Arial";
      ctx.fillStyle = "#1DA1F2";
      ctx.fillText("byte", canvas.width - 87, 50);
      ctx.font = "bold 20px Arial";
      ctx.fillStyle = "#F26E1C";
      ctx.fillText("XL", canvas.width - 47, 50);

      ctx.textAlign = "center"; 
      ctx.font = "bold 4rem Arial"; 
      ctx.fillStyle = "#F26E1C";
      ctx.fillText("Certificate", 1070/2, 120);

      //of
      ctx.font = "bold 2rem Arial";
      ctx.fillStyle = "#1DA1F2";
      ctx.fillText("of", 1070/2, 160);

      //type
      ctx.fillStyle = "#F26E1C";
      ctx.fillText(truncateText(`${type}`,3), 1070/2 , 200);


      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.fillText("This is to certify that", 1070/2, 240);
      ctx.font = "50px auto Arial";
      ctx.fillStyle = "#1DA1F2";
      ctx.fillText(truncateText(`${name}`,2), 1070/2, 300);
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(
        "has successfully cleared the assessment for the skill",
        1070/2,
        340
      );
      ctx.font = "italic bold 1.42rem Arial";
      ctx.fillStyle = "#F26E1C";
      ctx.fillText(truncateText(`${course}`,3), 1070/2, 380);

      // Draw footer
      ctx.textAlign = "start";
      ctx.font = "bold 15px Arial";
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
      ctx.font = "bold 15px Arial";
      ctx.fillStyle = "#F26E1C";
      ctx.fillText(
        "Date of Achievement",
        canvas.width - 470,
        canvas.height - 80
      );

      ctx.font = "bold 15px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(
          "Karun Tadepalli",
          canvas.width - 200,
          canvas.height - 100
        );
        ctx.font = "bold 15px Arial";
        ctx.fillStyle = "#F26E1C";
        ctx.fillText(
          "CEO & Co-founder",
          canvas.width - 210,
          canvas.height - 80
        );
      

      // Draw the image
      // const sign = new Image();
      // sign.onload = function () {
      //   ctx.drawImage(sign, canvas.width - 170, canvas.height - 150, 50, 40);
      //   ctx.font = "bold 15px Arial";
      //   ctx.fillStyle = "black";
      //   ctx.fillText(
      //     "Karun Tadepalli",
      //     canvas.width - 200,
      //     canvas.height - 100
      //   );
      //   ctx.font = "bold 15px Arial";
      //   ctx.fillStyle = "#F26E1C";
      //   ctx.fillText(
      //     "CEO & Co-founder",
      //     canvas.width - 210,
      //     canvas.height - 80
      //   );
      // };
      // sign.src =require("./sign.webp")
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
