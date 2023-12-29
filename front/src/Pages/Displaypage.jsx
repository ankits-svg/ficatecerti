import React, { useEffect, useRef, useState } from "react";
import "../Components/Display.css";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import CertificateCanvas from "./CertificateCanvas";
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

const token = "f20bcfdf6bbe0d64ba13777b9fe5a89ccca3b546";

let topicsData = [
  {
    topic: "JavaScript (Basic)",
    body: "Understanding data types, let vs const usage, hoisting in functions, closures and their role in JavaScript basics.",
  },
  {
    topic: "Python (Basic)",
    body: "Exploring variables and their scope, principles of object-oriented programming (OOPs), and fundamental Python programming concepts.",
  },
  {
    topic: "React (Introduction)",
    body: "Delving into React components, the usage of props for dynamic data, managing local state, and gaining an overview of React fundamentals.",
  },
  {
    topic: "HTML5",
    body: "Introduction to semantic HTML elements for better page structure, working with forms, incorporating multimedia elements, and utilizing the canvas element for graphics.",
  },
  {
    topic: "CSS3",
    body: "Mastering flexbox and grid for layout design, creating responsive interfaces, understanding transitions, and applying key CSS3 styling techniques.",
  },
  {
    topic: "Node.js",
    body: "Managing packages with npm, asynchronous programming using callbacks and Promises, and understanding event-driven architecture in Node.js development.",
  },
  {
    topic: "SQL (Databases)",
    body: "Executing queries for data retrieval, exploring joins for data relationships, normalization techniques, and understanding indexing for query optimization in SQL databases.",
  },
  {
    topic: "Git (Version Control)",
    body: "Committing changes, branching for parallel development, merging branches, and creating pull requests. Essential Git commands and version control basics.",
  },
  {
    topic: "RESTful API Design",
    body: "Designing API endpoints for resource manipulation, understanding HTTP methods, utilizing status codes, implementing authentication mechanisms, and adhering to RESTful principles.",
  },
  {
    topic: "Responsive Web Design",
    body: "Implementing media queries for different device breakpoints, creating fluid layouts, embracing mobile-first design principles, and employing techniques for creating responsive web pages.",
  },
  {
    topic: "Redux (State Management)",
    body: "Implementing actions for state changes, using reducers to specify how state changes in response to actions, and managing the state in a centralized store. Understanding middleware for additional functionality.",
  },
  {
    topic: "Docker (Containerization)",
    body: "Understanding containers, creating and managing images with Docker, crafting Dockerfiles for application setup, and exploring container orchestration for scaling applications.",
  },
  {
    topic: "GraphQL (API Query Language)",
    body: "Defining a schema for the API, executing queries for data retrieval, implementing mutations for data modifications, and understanding subscriptions for real-time updates in GraphQL.",
  },
  {
    topic: "Jest (JavaScript Testing Framework)",
    body: "Writing unit tests for JavaScript code, making assertions to validate code behavior, mocking external dependencies, and handling asynchronous code testing. Basics of using Jest for effective JavaScript application testing.",
  },
  {
    topic: "TypeScript (Typed JavaScript)",
    body: "Creating interfaces for defining object shapes, using types for specifying variable types, and leveraging generics for reusable code. Understanding namespaces and decorators in TypeScript for enhanced code organization.",
  },
  {
    topic: "Firebase (Backend as a Service)",
    body: "Implementing user authentication, utilizing Firestore for real-time database interactions, exploring cloud functions for serverless execution. An overview of Firebase services for efficient backend development.",
  },
  {
    topic: "Angular (JavaScript Framework)",
    body: "Developing components for building the UI, creating services for business logic, working with directives for DOM manipulation, configuring modules for application structure, and implementing routing for navigation in Angular applications.",
  },
  {
    topic: "Vue.js (JavaScript Framework)",
    body: "Understanding Vue components for UI building, utilizing directives for DOM manipulations, managing state with Vuex, and configuring routers for navigation. Introduction to Vue.js and its core concepts.",
  },
  {
    topic: "Web Accessibility",
    body: "Implementing ARIA roles for enhanced accessibility, using semantic HTML for clear page structure, managing focus for better user experience, and incorporating keyboard navigation. Principles and best practices of web accessibility.",
  },
  {
    topic: "CI/CD (Continuous Integration/Continuous Deployment)",
    body: "Implementing automated testing for code quality, configuring deployment pipelines for continuous integration, versioning for tracking changes, and understanding key concepts of CI/CD for efficient software development.",
  },
  {
    topic: "Python (Intermediate)",
    body: "Exploring advanced Python concepts such as decorators for modifying functions, generators for lazy evaluation, and context managers for resource management.",
  },
  {
    topic: "Machine Learning (Introduction)",
    body: "Understanding supervised learning for labeled data, unsupervised learning for unlabeled data, basics of neural networks, and the fundamental concepts of machine learning.",
  },
  {
    topic: "AWS (Cloud Computing)",
    body: "Working with EC2 for scalable compute resources, utilizing S3 for object storage, implementing serverless functions with Lambda, and gaining a foundational understanding of AWS cloud services.",
  },
  {
    topic: "GraphQL (Advanced)",
    body: "Exploring advanced GraphQL concepts such as subscriptions for real-time updates, directives for defining schema behavior, and federation for scalable and modularized GraphQL architecture.",
  },
  {
    topic: "Java (Basic)",
    body: "Introducing variables and data types, controlling flow with loops and conditionals, and gaining a foundational understanding of Java programming language basics.",
  },
  {
    topic: "C# (Basic)",
    body: "Understanding variables, data types, and control flow in C# programming language. Exploring the basics of C# for application development.",
  },
];

//http://localhost:1200
// https://serverbyte.onrender.com/save
const DisplayPage = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [url, setUrl] = useState(`https://serverbyte.onrender.com/get/${id}`);
  const inputRef = useRef(null);
  const currentUrl = window.location.href;
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();
  const [canvasRef, setCanvasRef] = useState(null);
  const [cloud, setCloud] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  console.log("data:", data);
  const handleCanvasRef = (canvas) => {
    setCanvasRef(canvas);
  };

  let newBody;

  useEffect(() => {
    // window.location.reload()
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setData(res.data);
    //     newBody = topicsData.find((el) => el.topic === res.data.course);
    //     setBody(newBody.body);
    //     setTopic(newBody.topic);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setData(data.data);

        const newBody = topicsData.find((el) => el.topic === data.data.course);
        setBody(newBody.body);
        setTopic(newBody.topic);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url, id, currentUrl]);

  useEffect(() => {
    // const img = localStorage.getItem("certificate-image");
    // fetch(`https://serverbyte.onrender.com/update/${id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ img: img }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //     setCloud(res.uploadedImage);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    const updateImage = async () => {
      try {
        const img = localStorage.getItem("certificate-image");
        const res = await fetch(`https://serverbyte.onrender.com/update/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ img: img }),
        });
        const data = await res.json();
        setCloud(data.uploadedImage);
      } catch (error) {
        console.error("Error updating image:", error);
      }
    };

    updateImage();
      // window.location.reload()
  }, [id]);

  const handleCopyClick = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      setIsCopied(!isCopied);
    }
  };

  const handleFacebook = () => {
    console.log("cloud:", cloud);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        cloud
      )}`
    );
  };

  const handleTwitter = () => {
    // window.location.reload()
    const course = `${data.course}`;
    const cloudinary_url = `${cloud}`;

    const tweetText = `I just earned ${course} skill certificate via @ByteXL. Get your skills certified and show the world what you can do! #skillup, ${cloudinary_url}`;

    const encodedTweetText = encodeURIComponent(tweetText);

    window.open(`https://twitter.com/intent/tweet?text=${encodedTweetText}`);
    window.location.reload();
  };

  const handleLinkedin = () => {
    // window.location.reload()
    const imageId = id;

    fetch(`https://serverbyte.onrender.com/images/${imageId}`)
      .then((res) => res.json())
      .then((res) => {
        const imageUrl = res.imageUrl;

        const encodedImageUrl = encodeURIComponent(imageUrl);
        const linkedinShareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedImageUrl}`;
        window.open(linkedinShareLink, "_blank");
      })
      .catch((err) => {
        console.error("Error fetching image:", err);
      });

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
      } else {
        console.error("No image data found in localStorage.");
      }
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const handleImage = () => {
    
    const imageUrl = `${data.img}`;

    // Open the image in a new tab
    window.open(imageUrl, "_blank");
    window.location.reload()
  };

  const extractFirstWords = (text, numberOfWords) => {
    if (text) {
      const words = text.split(" ");
      return words.slice(0, numberOfWords).join(" ");
    } else {
      return ""; // or any default value you prefer when text is undefined
    }
  };

  return (
    <Box className="containerStyle">
      <Box>
        <Button onClick={handleBackClick} mb="4">
          Back
        </Button>
      </Box>
      <Box
        textAlign={"start"}
        color={"black"}
        mb={"5"}
        className="certificatename"
      >
        <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
          {data.course} Certificate
        </Heading>
      </Box>
      <hr />
      <br />

      {/* Certificate and Share certificate content in column format */}
      <Box
        display="flex"
        flexDirection={{ base: "column", lg: "row" }}
        mt={{ base: 5, lg: 5 }}
      >
        {/* column 1st */}
        <Box
          flex={{ base: "1", md: "0.8", lg: "0.5" }}
          mb={{ base: "4", lg: "0" }}
          className="canvascertificate"
        >
          <CertificateCanvas data={data} handleCanvasRef={handleCanvasRef} />
        </Box>
        {/* column 2nd */}
        <Box flex={{ base: "1", lg: "1" }} className="certificateshare">
          <Text
            fontSize={{ base: "xl", md: "xl", lg: "2xl" }}
            fontWeight="bold"
            mb="4"
          >
            Share this Certificate
          </Text>
          <Box mb="4" display="flex" justifyContent={"space-evenly"}>
            <Box onClick={() => handleFacebook()} cursor="pointer" w={{ base: "7%", lg: "12%" }}>
              <Image
                margin={"auto"}
                width="100%"
                src="https://imgs.search.brave.com/jJCoPasn2serH2FU-dHJQycakDfaNS7AZ2vE_CuAUNg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzMyLzIwLzAz/LzM2MF9GXzUzMjIw/MDM1NV9vZEtOOU91/M1dCNmlIV0pURklF/bEZ0SmJUdXpKc3BZ/Ni5qcGc"
                alt="facebook"
              />
            </Box>
            <Box onClick={() => handleTwitter()} cursor="pointer" w={{ base: "7%", lg: "12%" }}>
              <Image
                margin={"auto"}
                width="100%"
                src="https://hrcdn.net/fcore/assets/social_share/twitter-96e2c898ae.svg"
                alt="twitter"
              />
            </Box>
            <Box onClick={() => handleLinkedin()} cursor="pointer" w={{ base: "7%", lg: "12%" }}>
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
              width={{ base: "70%", lg: "70%" }}
            />
            <Button
              onClick={handleCopyClick}
              bg={"skyblue"}
              color={"white"}
              width={{ base: "10%", lg: "30%" }}
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
            width={{ base: "20%", lg: "auto" }}
          >
            Download
          </Button>
          <Box mt={{ base: "5%", lg: "0" }} ml={{ base: "0", lg: "4%" }}>
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
            ml={{ base: "0", lg: "0" }}
          >
            {data.name}'s ByteXL Certificate
          </Heading>
        </Box>
        <Box
          borderRadius={{ base: "0", lg: "4" }}
          border={{ base: "2px solid #EBEBEC", lg: "2px solid #EBEBEC" }}
          w="100%"
          h="90%"
          p="15px"
        >
          <Box
            onClick={() => handleImage()}
            cursor={"pointer"}
            borderRadius={"4"}
            display={"flex"}
            flexDirection={"column"}
            w={{ base: "40%", lg: "30%" }}
            h={"100%"}
            bg={"#F26E1C"}
            color={"white"}
            p={"20px"}
          >
            <Box w={"30%"} h={"90%"}>
              <FiAward size={"60%"} />
            </Box>
            <Box textAlign={"start"} mb={"7"}>
              <Text>{extractFirstWords(data.course, 3)}</Text>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} mt={"-2"}>
              <Box>
                <Heading size={"s"}>Verified</Heading>
              </Box>
              <Box>
                <PiBookmarks size={"60%"} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DisplayPage;
