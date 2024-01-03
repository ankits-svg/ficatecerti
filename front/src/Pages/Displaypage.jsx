import React, { useEffect, useRef, useState } from "react";
import "../Components/Display.css";
import { useNavigate, useParams } from "react-router-dom";
import CertificateCanvas from "./CertificateCanvas";
import { Helmet } from "react-helmet-async";
import { Topicsdata } from "../Topicsdata";
import {
  Button,
  Box,
  Image,
  Input,
  Text,
  Heading,
  grid,
} from "@chakra-ui/react";
import { MdDownload } from "react-icons/md";
import { FiAward } from "react-icons/fi";
import { PiBookmarks } from "react-icons/pi";

// const token = "f20bcfdf6bbe0d64ba13777b9fe5a89ccca3b546";



// https://seri-knsj.onrender.com
//http://localhost:1200
// https://serverbyte.onrender.com/save
const DisplayPage = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [url, setUrl] = useState(`https://seri-knsj.onrender.com/get/${id}`);
  const inputRef = useRef(null);
  const currentUrl = window.location.href;
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();
  const [canvasRef, setCanvasRef] = useState(null);
  const [cloud, setCloud] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [img,setImg]=useState(localStorage.getItem("certificate-image")||[])
  const date1 = new Date();
  const showTime1 =
    date1.getHours() + ":" + date1.getMinutes() + ":" + date1.getSeconds();

  const date2 = new Date();
  const showTime2 =
    date2.getHours() + ":" + date2.getMinutes() + ":" + date2.getSeconds();
  const handleCanvasRef = (canvas) => {
    setCanvasRef(canvas);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        // console.log("1st render:", data.data, " ", showTime1);
        setData(data.data);

        const newBody = Topicsdata.find((el) => el.topic === data.data.course);
        setBody(newBody.body);
        setTopic(newBody.topic);
        // console.log("insideuseeffect:",data.data)
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    // const img = localStorage.getItem("certificate-image");
    // console.log("getting image from localstorage:",img)
    const updateImage = async () => {
      try {
        
        const res = await fetch(`https://seri-knsj.onrender.com/update/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ img: img }),
        });
        const data = await res.json();
        // console.log("2nd render:", data.uploadedImage, " ", showTime2);
        // localStorage.setItem('url',data.uploadedImage)
        setCloud(data.uploadedImage);
      } catch (error) {
        console.error("Error updating image:", error);
      }
    };

    updateImage();
  }, [id]);

  const handleCopyClick = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      setIsCopied(!isCopied);
    }
  };

  const handleFacebook = () => {
    if (cloud) {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          cloud
        )}`
      );
    } else {
      // console.error("No cloud data available.");
      window.location.reload()
    }
  };

  const handleTwitter = () => {

    if (cloud) {
      const course = `${data.course}`;
      const cloudinary_url = `${cloud}`;
      const tweetText = `I just earned ${course} skill certificate via @ByteXL. Get your skills certified and show the world what you can do! #skillup, ${cloudinary_url}`;
      const encodedTweetText = encodeURIComponent(tweetText);
      window.open(`https://twitter.com/intent/tweet?text=${encodedTweetText}`);
    } else {
      // console.error("No cloud data available.");
      window.location.reload()
    }
  };

  const handleLinkedin = () => {
    // let newurl=localStorage.getItem('url')
    if (cloud) {
      // LinkedIn sharing logic
      const encodedImageUrl = encodeURIComponent(cloud);
      const linkedinShareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedImageUrl}`;
     setTimeout(()=>{
      window.open(linkedinShareLink, "_blank");
     },800)
    } else {
      // console.error("No cloud data available.");
      // alert('might be some url is not available')
      window.location.reload()
      
    }
    // window.location.reload()
  };


  

  const handleDownload = async () => {
    if (canvasRef) {
      const imageData = localStorage.getItem("certificate-image");

      if (imageData) {
        const link = document.createElement("a");
        link.href = imageData;

        link.download = `${data.course}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // window.location.reload();
      } else {
        console.error("No image data found in localStorage.");
      }
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const handleImage = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); 
  };

  const extractFirstWords = (text, numberOfWords) => {
    if (text) {
      const words = text.split(" ");
      return words.slice(0, numberOfWords).join(" ");
    } else {
      return ""; 
    }
  };
  
  // console.log(`${data.course} Skill Certificate`,extractFirstWords(data.course, 20), cloud, currentUrl)
  return (
    <>
    <Helmet>
            {/* ... (your existing meta tags) */}
            {/* LinkedIn OG tags */}
            <meta property="og:title" content={`${data.course} Skill Certificate`} />
            <meta property="og:description" content={extractFirstWords(data.course, 20)} />
            {/* <meta property="og:image" content={cloud || defaultImageUrl} /> */}
            <meta name="image" property="og:image" content={cloud}></meta>
            <meta property="og:url" content={currentUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="ByteXL" />
            <meta name="author" content="Ankitsa"/>
          </Helmet>
    
    <Box className="containerStyle">
    
          

      
      
      <Box w={{ base: "100%", lg: "100%" }}>
        <Button onClick={handleBackClick} mb={{ base: 4, lg: 0 }}>
          Back
        </Button>
      </Box>
      {data ? (
        <>
            
          {/* Heading */}
          <Box
            textAlign={{ base: "start", lg: "start" }}
            color={"black"}
            mb={{ base: 5, lg: 5 }}
            className="certificatename"
          >
            <Heading
              textAlign={{ base: "start", lg: "start" }}
              fontSize={{ base: "s", md: "2xl", lg: "3xl" }}
              whiteSpace={{ base: "wrap", lg: "nowrap" }}
              ml={{ base: "2", lg: "4" }}
            >
              {data.course} Certificate
            </Heading>
          </Box>

          <Box
            as="hr"
            w={{ base: "100%", lg: "100%" }}
            borderWidth="1px"
            borderColor="gray.300"
            my="2"
          />
          <br />

          {/* Certificate and Share certificate content in column format */}
          <Box
            display={{ base: "flex", lg: "flex" }}
            flexDirection={{ base: "column", lg: "row" }}
            mt={{ base: 5, lg: 5 }}
            w={{ base: "100%", lg: "100%" }}
            justifyContent={"space-between"}
          >
            {/* column 1st */}
            <Box
              w={{ base: "100%", lg: "100%" }}
              margin={"auto"}
              flex={{ base: "1", md: "0.8", lg: "0.5" }}
              mb={{ base: "4", lg: "0" }}
              className="canvascertificate"
            >
              <CertificateCanvas
                data={data}
                handleCanvasRef={handleCanvasRef}
              />
            </Box>

            {/* column 2nd */}
            <Box w={{ base: "100%", lg: "30%" }} className="certificateshare">
              <Text
                fontSize={{ base: "xl", md: "xl", lg: "3xl" }}
                fontWeight="bold"
                mb="4"
                textAlign={{ base: "center", lg: "start" }}
              >
                Share this Certificate
              </Text>
              <Box
                // border={"2px solid red"}
                m={{ base: "", lg: "auto" }}
                w={{ base: "100%", lg: "50%" }}
                mb={{ base: "5%", lg: "10%" }}
                ml={{ base: "", lg: "-1" }}
                display="flex"
                justifyContent={{ base: "space-around", lg: "space-around" }}
              >
                <Box
                  onClick={() => handleFacebook()}
                  cursor="pointer"
                  w={{ base: "7%", lg: "17%" }}
                  // border={"2px solid red"}
                >
                  <Image
                    margin={"auto"}
                    width="100%"
                    src="https://imgs.search.brave.com/jJCoPasn2serH2FU-dHJQycakDfaNS7AZ2vE_CuAUNg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzMyLzIwLzAz/LzM2MF9GXzUzMjIw/MDM1NV9vZEtOOU91/M1dCNmlIV0pURklF/bEZ0SmJUdXpKc3BZ/Ni5qcGc"
                    alt="facebook"
                  />
                </Box>
                <Box
                  onClick={() => handleTwitter()}
                  cursor="pointer"
                  w={{ base: "7%", lg: "17%" }}
                >
                  <Image
                    margin={"auto"}
                    width="100%"
                    src="https://hrcdn.net/fcore/assets/social_share/twitter-96e2c898ae.svg"
                    alt="twitter"
                  />
                </Box>
                <Box
                  onClick={() => handleLinkedin()}
                  cursor="pointer"
                  w={{ base: "7%", lg: "17%" }}
                >
                  <Image
                    margin={"auto"}
                    width="100%"
                    src="https://hrcdn.net/fcore/assets/social_share/linkedin-fd4be6309a.svg"
                    alt="linkedin"
                  />
                </Box>
              </Box>
              <Box
                mb="4"
                className="copyButtonStyle"
                display={{ base: "flex", lg: "flex" }}
              >
                <Input
                  type="text"
                  value={currentUrl}
                  ref={inputRef}
                  readOnly
                  width={{ base: "70%", lg: "50%" }}
                />
                <Button
                  onClick={handleCopyClick}
                  bg={"skyblue"}
                  color={"white"}
                  width={{ base: "20%", lg: "20%" }}
                >
                  {isCopied ? "Copied!" : "Copy"}
                </Button>
              </Box>
              <Button
                bg={"teal"}
                color={"white"}
                onClick={handleDownload}
                mb="4"
                rightIcon={<MdDownload />}
                width={{ base: "35%", lg: "auto" }}
              >
                Download
              </Button>
              <Box mt={{ base: "5%", lg: "0" }} ml={{ base: "2", lg: "4%" }}>
                <Text
                  textAlign={"start"}
                  fontSize={{ base: "md", lg: "lg" }}
                  mb="2"
                  color={"gray"}
                  fontWeight={"bold"}
                >
                  {topic}
                </Text>
                <Text color={"gray"} textAlign={"start"}>
                  {body}
                </Text>
              </Box>
            </Box>
          </Box>

          {/* Bottom row */}
          <Box
            w={{ base: "100%", lg: "67%" }}
            h={{ base: "20rem", lg: "15rem" }}
            mt={{ base: "0", lg: 0 }}
            className="imagebottom"
          >
            <Box w={{ base: "90%", lg: "51%" }} mt={"10"} mb={"10"}>
              <Heading
                whiteSpace="nowrap"
                as="h1"
                fontSize={"20px"}
                textAlign={{ base: "start", lg: "start" }}
                ml={{ base: "2", lg: "4%" }}
              >
                {data.name}'s ByteXL Certificate
              </Heading>
            </Box>
            <Box
              borderRadius={{ base: "0", lg: "4" }}
              border={{ base: "2px solid #EBEBEC", lg: "2px solid #EBEBEC" }}
              w={{ base: "100%", lg: "100%" }}
              margin={"auto"}
              ml={{ base: "2", lg: "4" }}
              h={{ base: "70%", lg: "90%" }}
              p="15px"
            >
              <Box
                onClick={() => handleImage()}
                cursor={"pointer"}
                borderRadius={"4"}
                display={"flex"}
                flexDirection={"column"}
                w={{ base: "70%", lg: "30%" }}
                h={"100%"}
                bg={"#F26E1C"}
                color={"white"}
                p={"20px"}
              >
                <Box w={{ base: "60%", lg: "90%" }} h={"70%"}>
                  <FiAward size={"50%"} />
                </Box>
                <Box textAlign={"start"} mb={"7"} mt={"-5"}>
                  <Text>{extractFirstWords(data.course, 3)}</Text>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  mt={"-7"}
                >
                  <Box>
                    <Heading size={"s"}>Verified</Heading>
                  </Box>
                  <Box margin={"end"} w={{ base: "60%", lg: "90%" }}>
                    <PiBookmarks size={"50%"} margin={"end"} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <Box>{isLoading && <Box>...Loading</Box>}</Box>
      )}
    </Box>
    </>
  );
};

export default DisplayPage;
