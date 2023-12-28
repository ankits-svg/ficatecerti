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
  { topic: "Python (Basic)", body: "Exploring variables and their scope, principles of object-oriented programming (OOPs), and fundamental Python programming concepts." },
  { topic: "React (Introduction)", body: "Delving into React components, the usage of props for dynamic data, managing local state, and gaining an overview of React fundamentals." },
  { topic: "HTML5", body: "Introduction to semantic HTML elements for better page structure, working with forms, incorporating multimedia elements, and utilizing the canvas element for graphics." },
  { topic: "CSS3", body: "Mastering flexbox and grid for layout design, creating responsive interfaces, understanding transitions, and applying key CSS3 styling techniques." },
  { topic: "Node.js", body: "Managing packages with npm, asynchronous programming using callbacks and Promises, and understanding event-driven architecture in Node.js development." },
  { topic: "SQL (Databases)", body: "Executing queries for data retrieval, exploring joins for data relationships, normalization techniques, and understanding indexing for query optimization in SQL databases." },
  { topic: "Git (Version Control)", body: "Committing changes, branching for parallel development, merging branches, and creating pull requests. Essential Git commands and version control basics." },
  {
    topic: "RESTful API Design",
    body: "Designing API endpoints for resource manipulation, understanding HTTP methods, utilizing status codes, implementing authentication mechanisms, and adhering to RESTful principles.",
  },
  { topic: "Responsive Web Design", body: "Implementing media queries for different device breakpoints, creating fluid layouts, embracing mobile-first design principles, and employing techniques for creating responsive web pages." },
  { topic: "Redux (State Management)", body: "Implementing actions for state changes, using reducers to specify how state changes in response to actions, and managing the state in a centralized store. Understanding middleware for additional functionality." },
  {
    topic: "Docker (Containerization)",
    body: "Understanding containers, creating and managing images with Docker, crafting Dockerfiles for application setup, and exploring container orchestration for scaling applications.",
  },
  { topic: "GraphQL (API Query Language)", body: "Defining a schema for the API, executing queries for data retrieval, implementing mutations for data modifications, and understanding subscriptions for real-time updates in GraphQL." },
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
  { topic: "Web Accessibility", body: "Implementing ARIA roles for enhanced accessibility, using semantic HTML for clear page structure, managing focus for better user experience, and incorporating keyboard navigation. Principles and best practices of web accessibility." },
  {
    topic: "CI/CD (Continuous Integration/Continuous Deployment)",
    body: "Implementing automated testing for code quality, configuring deployment pipelines for continuous integration, versioning for tracking changes, and understanding key concepts of CI/CD for efficient software development.",
  },
  { topic: "Python (Intermediate)", body: "Exploring advanced Python concepts such as decorators for modifying functions, generators for lazy evaluation, and context managers for resource management." },
  { topic: "Machine Learning (Introduction)", body: "Understanding supervised learning for labeled data, unsupervised learning for unlabeled data, basics of neural networks, and the fundamental concepts of machine learning." },
  { topic: "AWS (Cloud Computing)", body: "Working with EC2 for scalable compute resources, utilizing S3 for object storage, implementing serverless functions with Lambda, and gaining a foundational understanding of AWS cloud services." },
  { topic: "GraphQL (Advanced)", body: "Exploring advanced GraphQL concepts such as subscriptions for real-time updates, directives for defining schema behavior, and federation for scalable and modularized GraphQL architecture." },
  { topic: "Java (Basic)", body: "Introducing variables and data types, controlling flow with loops and conditionals, and gaining a foundational understanding of Java programming language basics." },
  { topic: "C# (Basic)", body: "Understanding variables, data types, and control flow in C# programming language. Exploring the basics of C# for application development." },
];


// https://serverbyte.onrender.com/save
const DisplayPage = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [url, setUrl] = useState(`http://localhost:1200/get/${id}`);
  const inputRef = useRef(null);
  const currentUrl = window.location.href;
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();
  const [canvasRef, setCanvasRef] = useState(null);
  const [cloud, setCloud] = useState(null);
  const [isCopied, setIsCopied] = useState(false);


  console.log("data:",data)
  const handleCanvasRef = (canvas) => {
    setCanvasRef(canvas);
  };

  let newBody;

  useEffect(() => {
    // window.location.reload()
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        newBody = topicsData.find((el) => el.topic === res.data.course);
        setBody(newBody.body);
        setTopic(newBody.topic);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url, id, currentUrl]);

  useEffect(() => {
    
    const img = localStorage.getItem("certificate-image");
    fetch(`http://localhost:1200/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ img: img }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCloud(res.uploadedImage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleCopyClick = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      setIsCopied(!isCopied);
    }
  };

  const handleFacebook = () => {
    console.log("cloud:",cloud)
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

    fetch(`http://localhost:1200/images/${imageId}`)
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
        
        link.download = "certificate.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("No image data found in localStorage.");
      }
    }
  };

  const handleBackClick=()=>{
      navigate("/");
      
  }

  const handleImage=()=>{
    const imageUrl = `${data.img}`;
  
  // Open the image in a new tab
    window.open(imageUrl, '_blank');
  }
  return (
    
      <Box className="containerStyle">
        <Box>
        <Button onClick={handleBackClick} mb="4">
          Back
        </Button>
      </Box>
        <Box textAlign={'start'} color={'black'} mb={'5'}>
        <Heading>{data.course} Certificate</Heading>
      </Box>
      <hr/>
      <br />
      <Box display="flex" flexDirection={'row'} mt={'5'}>
        {/* column 1st */}
        <Box flex="1" mr="4">
          {/* Assuming CertificateCanvas is a Chakra UI component */}
          <CertificateCanvas data={data} handleCanvasRef={handleCanvasRef} />
        </Box>
        {/* column 2nd */}
        <Box flex="1">
          <Text fontSize="2xl" fontWeight="bold" mb="4">
            Share this Certificate
          </Text>
          <Box mb="4" display="flex" justifyContent={'space-evenly'}>
            <Box
              onClick={() => handleFacebook()}
              cursor="pointer"
              w={'12%'}
              
            >
              <Image
              margin={'auto'}
                width="100%"
                src="https://imgs.search.brave.com/jJCoPasn2serH2FU-dHJQycakDfaNS7AZ2vE_CuAUNg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzMyLzIwLzAz/LzM2MF9GXzUzMjIw/MDM1NV9vZEtOOU91/M1dCNmlIV0pURklF/bEZ0SmJUdXpKc3BZ/Ni5qcGc"
                alt="facebook"
              />
            </Box>
            <Box
              onClick={() => handleTwitter()}
              cursor="pointer"
              w={'12%'}
              
            >
              <Image
              margin={'auto'}
                width="100%"
                src="https://hrcdn.net/fcore/assets/social_share/twitter-96e2c898ae.svg"
                alt="twitter"
              />
            </Box>
            <Box
              onClick={() => handleLinkedin()}
              cursor="pointer"
              
              w={'12%'}
              
            >
              <Image
              margin={'auto'}
                width="100%"
                src="https://hrcdn.net/fcore/assets/social_share/linkedin-fd4be6309a.svg"
                alt="linkedin"
              />
            </Box>
          </Box>
          <Box mb="4" className="copyButtonStyle" display={'flex'}>
            <Input
              type="text"
              value={currentUrl}
              ref={inputRef}
              readOnly
              width="100%"
            />
            <Button onClick={handleCopyClick} bg={'skyblue'} color={'white'}>{isCopied ? "Copied!" : "Copy"}</Button>
          </Box>
          <Button bg={'teal'} color={'white'} onClick={handleDownload} mb="4" rightIcon={<MdDownload />}>
            Download
          </Button>
          <Box mt={'5%'} display={'flex'} flexDirection={'column'} textAlign={'start'} ml={'4%'}>
          <Text fontSize="lg" mb="2" color={'gray'} fontWeight={'bold'}>
            {topic}
          </Text>
          <Text color={'gray'}>{body}</Text>
          </Box>
        </Box>
      
        
      </Box>
      {/* Bottom row */}
      <Box  border={'2px solid #EBEBEC'} w={"67%"} h={'13rem'} mt={'2rem'} borderRadius={'4'} >
          <Box w={'51%'}>
            <Heading as='h2' size='m' textAlign={'start'} ml={'10px'}>{data.name}'s ByteXL Certificate</Heading>
          </Box>
        <Box  w={'66%'} h={'90%'} p={'20px'}>
          <Box onClick={()=>handleImage()} cursor={'pointer'} display={'flex'} flexDirection={'column'} w={'30%'} h={'100%'} bg={"#F26E1C"} color={'white'} p={'20px'}>
            {/* <Image src="" alt="award" /> */}
            <Box><FiAward size={'40%'}/></Box>
            <Box textAlign={'start'}><Text>{data.course}</Text></Box>
            <Box display={'flex'} justifyContent={'space-between'}>
            <Heading size={'s'}>Verified</Heading>
            {/* <Image src="" alt="bookmark" /> */}
            <PiBookmarks size={'40%'} />
            </Box>
          </Box>
        </Box>
        </Box>
    </Box>
      
    
    // <>
      
      
    //   <button
    //     onClick={() => {
    //       navigate("/");
    //     }}
    //   >
    //     Back
    //   </button>
    //   <div className="containerStyle">
    //     <div className="canva">
    //       <CertificateCanvas data={data} handleCanvasRef={handleCanvasRef} />
    //     </div>
    //     <div className="rightDivStyle">
    //       <div>
    //         <h2>Share this Certificate</h2>
    //       </div>
    //       <div className="social">
    //         <div onClick={() => handleFacebook()}>
    //           <img
    //             width={"80%"}
    //             src="https://imgs.search.brave.com/jJCoPasn2serH2FU-dHJQycakDfaNS7AZ2vE_CuAUNg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzMyLzIwLzAz/LzM2MF9GXzUzMjIw/MDM1NV9vZEtOOU91/M1dCNmlIV0pURklF/bEZ0SmJUdXpKc3BZ/Ni5qcGc"
    //             alt="facebook"
    //           />
    //         </div>
    //         <div onClick={() => handleTwitter()}>
    //           <img
    //             width={"80%"}
    //             src="https://hrcdn.net/fcore/assets/social_share/twitter-96e2c898ae.svg"
    //             alt="linkedin"
    //           />
    //         </div>
    //         <div onClick={() => handleLinkedin()}>
    //           <img
    //             width={"80%"}
    //             src="https://hrcdn.net/fcore/assets/social_share/linkedin-fd4be6309a.svg"
    //             alt="linkedin"
    //           />
    //         </div>
    //       </div>
    //       <div className="copyButtonStyle">
    //         <input
    //           type="text"
    //           value={currentUrl}
    //           ref={inputRef}
    //           readOnly
    //           style={{ width: "100%" }}
    //         />
    //         <button onClick={handleCopyClick}>Copy</button>
    //       </div>
    //       <div>
    //         <button style={{ padding: "0.3125rem" }} onClick={handleDownload}>
    //           Download
    //         </button>
    //       </div>
    //       <div>
    //         <h3>{topic}</h3>
    //       </div>
    //       <div>
    //         <p>{body}</p>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default DisplayPage;
