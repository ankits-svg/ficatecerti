import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  IconButton,
  Heading,
  Image,
  Input,
  Button,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import "./App.css";
// import { Embed } from "@chakra-ui/react";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
// import FormComponent from "./Components/Form/FormComponent";
// import DisplayDetailsComponent from "./Components/Form/DisplayDetailsComponent";

function App() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [type,setType]=useState("")
  const [linkedin, setLinkedin] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [copy, setCopy] = useState("");

  const generateCertificate = async () => {
    let obj = {
      name: name,
      course: course,
      type:type.toUpperCase(),
      linkedin: linkedin,
    };
    // localStorage.setItem("details", JSON.stringify(obj));
    if (obj.name !== "" || obj.course !== "" ||obj.type!=="" || obj.linkedin !== "") {
      try {
        const response = await fetch(
          "https://bytexlpdf.onrender.com/api/generateCertificate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, course,type:type.toUpperCase(), linkedin }),
          }
        );

        const pdfBuffer = await response.arrayBuffer();
        // console.log("pdfBuffer:",pdfBuffer)
        const blob = new Blob([pdfBuffer], { type: "application/pdf" });
        // console.log("blob:",blob)
        const url = URL.createObjectURL(blob);
        // console.log("url:",url)
        // localStorage.setItem('url',JSON.stringify(url))
        setPdfUrl(url);
        setName("");
        setCourse("");
        setType("")
        // setlinkedin("")
      } catch (error) {
        console.error("Error generating certificate:", error);
      }
    } else {
      alert("Please fill the details");
    }
  };

  const handleCopy = () => {
    const urlInput = document.getElementById("pdfUrlInput");
    console.log("urlInput:", urlInput.value);
    if (urlInput) {
      urlInput.select();
      document.execCommand("copy");
      setCopy("Copied!");
    }
  };
  const isDisabled = !name || !course || !type || !linkedin;

  // return (
  //   <ChakraProvider>
  //     <Box className="App" textAlign="center" p={8}>
  //       <FormComponent
  //         generateCertificate={generateCertificate}
  //         setName={setName}
  //         setCourse={setCourse}
  //         setLinkedin={setLinkedin}
  //       />
  //       {pdfUrl && (
  //         <DisplayDetailsComponent
  //           pdfUrl={pdfUrl}
  //           handleCopy={handleCopy}
  //           copy={copy}
  //           linkedin={linkedin}
  //         />
  //       )}
  //       {pdfUrl && (
  //         <Box>
  //           <iframe
  //             title="Generated Certificate"
  //             src={pdfUrl}
  //             frameBorder="0"
  //             style={{
  //               border: "none",
  //               width: "80%",
  //               height: "125vh",
  //               overflow: "hidden",
  //               margin: "auto",
  //               marginTop: "20px",
  //             }}
  //           ></iframe>
  //         </Box>
  //       )}
  //     </Box>
  //   </ChakraProvider>
  // )

  return (
    <ChakraProvider>
      <Box className="App" textAlign="center" p={8}>
        <Heading as="h1" size="xl" mb={4}>
          Certificate Generator
        </Heading>
        <Box mb={4}>
          <InputGroup>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Box mb={4}>
          <InputGroup>
            <Input
              placeholder="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Box mb={4}>
          <InputGroup>
            <Input
              placeholder="Type of Certificate"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Box mb={4}>
          <InputGroup>
            <Input
              placeholder="Linkedin Username"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Button
          colorScheme="teal"
          size="md"
          mb={4}
          onClick={generateCertificate}
          isDisabled={isDisabled}
        >
          Generate Certificate
        </Button>

        {pdfUrl && (
          <Box
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-around"
            w="100%"
            mb={4}
          >
            <Box flex="1" pr={{ base: 0, md: 4 }}>
              <iframe
                title="Generated Certificate"
                src={pdfUrl}
                frameBorder="0"
                style={{
                  border: "2px solid gray",
                  width: "100%",
                  height: "494px",
                  margin: "auto",
                  marginTop: "20px",
                  borderRadius: "20px", // Add the desired border radius value
                }}
              ></iframe>
            </Box>
            <Box flex="0 0 30%" pl={{ base: 0, md: 4 }} m={"20px"}>
              <Heading as="h2" size="lg" mb={4}>
                Generated Certificate URL:
              </Heading>
              <Box>
                <InputGroup>
                  <Input
                    id="pdfUrlInput"
                    type="url"
                    value={pdfUrl}
                    readOnly
                    onClick={(e) => e.target.select()}
                    pr="1rem"
                    focusBorderColor="teal" // Set the focus border color to teal
                    borderColor="teal" // Set the border color to teal
                  />
                  <InputRightElement width="4.5rem" pr="0">
                    <Button h="1.75rem" size="sm" onClick={handleCopy} colorScheme="teal">
                      {copy ? "Copied!" : "Copy"}
                    </Button>
                   
                  </InputRightElement>
                </InputGroup>
                <Text color="green.500" mt={2}>
                  {copy}
                </Text>
              </Box>
              <Box mt={4}>
                <Heading as="h3" size="md">
                  Share Certificate:
                </Heading>
                <IconButton
                  colorScheme="twitter"
                  size="md"
                  aria-label="Share on Twitter"
                  icon={<FaTwitter />}
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${pdfUrl}&text=Check out my certificate`
                    )
                  }
                  borderRadius="full"
                  mr={2}
                />
                <IconButton
                  colorScheme="linkedin"
                  size="md"
                  aria-label="Share on LinkedIn"
                  icon={<FaLinkedin />}
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/in/${linkedin}/edit/forms/certification/new/?profileFormEntryPoint=PROFILE_COMPLETION_HUB`
                    )
                  }
                  borderRadius="full"
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
