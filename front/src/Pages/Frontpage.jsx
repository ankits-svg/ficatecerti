import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import { BeatLoader } from 'react-spinners';


let topicsData = [
  { topic: "JavaScript (Basic)", body: "data-types, let vs const, hoisting, closures" },
  { topic: "Python (Basic)", body: "variables, oops" },
  { topic: "React (Introduction)", body: "components, props, state" },
  { topic: "HTML5", body: "semantic elements, forms" },
  { topic: "CSS3", body: "flexbox, grid, responsive design" },
  { topic: "Node.js", body: "npm, asynchronous programming" },
  { topic: "SQL (Databases)", body: "queries, joins, normalization" },
  { topic: "Git (Version Control)", body: "commit, branch, merge" },
  { topic: "RESTful API Design", body: "endpoints, HTTP methods, status codes" },
  { topic: "Responsive Web Design", body: "media queries, fluid layouts" },
  { topic: "Redux (State Management)", body: "actions, reducers, store" },
  { topic: "Docker (Containerization)", body: "containers, images, Dockerfile" },
  { topic: "GraphQL (API Query Language)", body: "schema, queries, mutations" },
  { topic: "Jest (JavaScript Testing Framework)", body: "unit testing, assertions" },
  { topic: "TypeScript (Typed JavaScript)", body: "interfaces, types, generics" },
  { topic: "Firebase (Backend as a Service)", body: "authentication, Firestore" },
  { topic: "Angular (JavaScript Framework)", body: "components, services, directives" },
  { topic: "Vue.js (JavaScript Framework)", body: "components, directives, Vuex" },
  { topic: "Web Accessibility", body: "aria, semantic HTML, focus management" },
  { topic: "CI/CD (Continuous Integration/Continuous Deployment)", body: "automated testing, deployment pipelines" },
];

const certificateTypes = [
  "Participation",
  "Completion",
  "Achievement",
  "Excellence",
  "Recognition",
  "Appreciation",
  "Merit",
  "Honor",
  "Professional",
  "Academic",
  "Training",
  "Sports Achievement",
  "Language Proficiency",
  "First Aid",
  "Project Completion",
  "Leadership",
  "Volunteer",
  "Safety"
];

const Frontpage = () => {
  // const toast = useToast()
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [course, setCourse] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const navigate=useNavigate()

  const validateForm = () => {
    setIsFormValid(name !== "" && type !== "" && course !== "" && linkedin !== "");
  };

  const handleCertificateChange = (event) => {
    const selectedValue = event.target.value;
    setType(selectedValue);
    validateForm();
    // You can add additional logic or actions here based on the selected certificate type
    // For example, you might want to display more information or trigger an event.
    // console.log('Selected Certificate:', selectedValue);
  };

  const handleTopicChange = (event) => {
    setCourse(event.target.value);
    validateForm();
  };
  const handleGenerate=()=>{
    let obj={
      name:name,type:type,course:course,linkedin:linkedin
    }
    console.log("obj:",obj)
    
    
      setIsClicked(true);
      fetch("http://localhost:1200/save",{
      method:"POST",
      body:JSON.stringify(obj),
      headers:{
        "Content-Type":"application/json"
      }
    }).then(res=>res.json()).then(res=>{
      console.log("Res:",res)
      setTimeout(()=>{
        navigate(`/display/${res.data._id}`)
      },3000)

      
    }).catch(err=>{
      console.log(err)
    })
    
  }
  return (
    <Box w={'80%'} margin={'auto'} mt={'5%'} border={'4px solid skyblue'} p={'10px'} borderRadius={'14'}>
      <FormControl isRequired>
        <FormLabel htmlFor="nameType">Name of Achiever:</FormLabel>
        <Input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            validateForm();
          }}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="certificateType">Select Certificate Type:</FormLabel>
        <Select id="certificateType" value={type} onChange={handleCertificateChange}>
          <option value="">Select...</option>
          {certificateTypes.map((certificateType, index) => (
            <option key={index} value={certificateType}>
              {certificateType}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="courseType">Select Course Type:</FormLabel>
        <Select id="topicSelect" value={course} onChange={handleTopicChange}>
          <option value="">Select a topic</option>
          {topicsData.map((topicObj) => (
            <option key={topicObj.topic} value={topicObj.topic}>
              {topicObj.topic}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="linkedinType">Linkedin Username:</FormLabel>
        <Input
          type="text"
          placeholder="Enter linkedin username"
          value={linkedin}
          onChange={(e) => {
            setLinkedin(e.target.value)
            validateForm();
          }}
        />
      </FormControl>
      <Button
        onClick={handleGenerate}
        bg={isClicked ? 'blue' : 'orange'}
        color={isClicked ? 'white' : 'black'}
        mt="3%"
        isLoading={isClicked}
        isDisabled={!isFormValid}
        _loading={{
          color: 'white',
          bg: 'blue',
          _hover: {
            bg: 'blue.500',
          },
        }}
        spinner={<BeatLoader size={8} color='white' />}
      >
        {isClicked ? 'Generating Certificate' : 'Generate Certificate'}
      </Button>
    </Box>
  );
};

export default Frontpage;
