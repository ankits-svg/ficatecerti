import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
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
import DocumentMeta from 'react-document-meta';

const Frontpage = () => {
  // const toast = useToast()
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [course, setCourse] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    setIsFormValid(
      name !== "" && type !== "" && course !== "" && linkedin !== ""
    );
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
  const handleGenerate = () => {
    let obj = {
      name: name,
      type: type,
      course: course,
      linkedin: linkedin,
    };
    // console.log("obj:", obj);

    setIsClicked(true);
    fetch("https://seri-knsj.onrender.com/save", {
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

  const meta = {
    title: `${course} Certificate - ByteXL`,
    description: `Generate a ${course} certificate with ByteXL. Join our community of developers and enhance your coding skills!`,
    
  }

  const metaDescription = `Generate a ${course} certificate with ByteXL. Join our community of developers and enhance your coding skills!`;
  const ogTitle = `${course} Certificate - ByteXL`;
  const ogDescription = `Generate a ${course} certificate with ByteXL. Join our community of developers and enhance your coding skills!`;
  // const ogImageUrl =
  // Update meta tags dynamically
  document.getElementById("meta-description").content = metaDescription;
  document.getElementById("meta-og-title").content = ogTitle;
  document.getElementById("meta-og-description").content = ogDescription;
  // document.getElementById("meta-og-image").content = ogImageUrl;
  
  return (
    <Box
      w={"80%"}
      margin={"auto"}
      mt={"5%"}
      border={"4px solid skyblue"}
      p={"10px"}
      borderRadius={"14"}
    >
      <Helmet>
        <meta
          name="description"
          content={`Generate a ${course} certificate with ByteXL. Join our community of developers and enhance your coding skills!`}
        />
        <meta property="og:title" content={`${course} Certificate - ByteXL`} />
        <meta
          property="og:description"
          content={`Generate a ${course} certificate with ByteXL. Join our community of developers and enhance your coding skills!`}
        />
        {/* <meta property="og:image" content={ogImage} /> */}
      </Helmet>
      <DocumentMeta {...meta}>
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
      </DocumentMeta>
    </Box>
  );
};

export default Frontpage;
