import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import { certificateTypes } from "../certificateTypes";
import { Topicsdata } from "../Topicsdata";
import { BeatLoader } from "react-spinners";





const Frontpage = () => {
  // const toast = useToast()
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [course, setCourse] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  // const [ogTitle, setOgTitle] = useState("Default Title");
  // const [ogDescription, setOgDescription] = useState("Default Description");
  // const [ogImage, setOgImage] = useState("Default Image URL");
  // const [ogUrl, setOgUrl] = useState("Default Page URL");
  const navigate = useNavigate();

  const validateForm = () => {
    setIsFormValid(
      name !== "" && type !== "" && course !== "" && linkedin !== ""
    );
  };


  // console.log("ogTitle:", ogTitle);
  // console.log("ogDescription:", ogDescription);
  // console.log("ogImage:", ogImage);
  // console.log("ogUrl:", ogUrl);

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
  const handleGenerate = () => {
    let obj = {
      name: name,
      type: type,
      course: course,
      linkedin: linkedin,
    };
    // console.log("obj:", obj);
        
    // Update dynamic values based on your logic
    // setOgTitle(`Certificate for ${obj.name}`);
    // setOgDescription(`Achievement in ${obj.course}`);
    // setOgImage("URL of the image you want to use");
    // setOgUrl("URL of your page");
    setIsClicked(true);
    fetch("http://localhost:1200/save", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log("Res:", res);

        setTimeout(() => {
          navigate(`/display/${res.data._id}`);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    
    
    <Box
      w={"80%"}
      margin={"auto"}
      mt={"5%"}
      border={"4px solid skyblue"}
      p={"10px"}
      borderRadius={"14"}
    >
      

      <FormControl isRequired>
        <FormLabel htmlFor="nameType">Name of Achiever:</FormLabel>
        <Input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            validateForm();
          }}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="certificateType">
          Select Certificate Type:
        </FormLabel>
        <Select
          id="certificateType"
          value={type}
          onChange={handleCertificateChange}
        >
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
          {Topicsdata.map((topicObj) => (
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
            setLinkedin(e.target.value);
            validateForm();
          }}
        />
      </FormControl>
      <Button
        onClick={handleGenerate}
        bg={isClicked ? "blue" : "orange"}
        color={isClicked ? "white" : "black"}
        mt="3%"
        isLoading={isClicked}
        isDisabled={!isFormValid}
        _loading={{
          color: "white",
          bg: "blue",
          _hover: {
            bg: "blue.500",
          },
        }}
        spinner={<BeatLoader size={8} color="white" />}
      >
        {isClicked ? "Generating Certificate" : "Generate Certificate"}
      </Button>
    </Box>
    
  );
};

export default Frontpage;
