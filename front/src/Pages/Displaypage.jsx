import React, { useEffect, useRef, useState } from "react";
import "../Components/Display.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import html2canvas from "html2canvas";
import CertificateCanvas from "./CertificateCanvas";
import { compress } from "image-conversion";

const token="f20bcfdf6bbe0d64ba13777b9fe5a89ccca3b546"

let topicsData = [
  {
    topic: "JavaScript (Basic)",
    body: "data-types, let vs const, hoisting, closures",
  },
  { topic: "Python (Basic)", body: "variables, oops" },
  { topic: "React (Introduction)", body: "components, props, state" },
  { topic: "HTML5", body: "semantic elements, forms" },
  { topic: "CSS3", body: "flexbox, grid, responsive design" },
  { topic: "Node.js", body: "npm, asynchronous programming" },
  { topic: "SQL (Databases)", body: "queries, joins, normalization" },
  { topic: "Git (Version Control)", body: "commit, branch, merge" },
  {
    topic: "RESTful API Design",
    body: "endpoints, HTTP methods, status codes",
  },
  { topic: "Responsive Web Design", body: "media queries, fluid layouts" },
  { topic: "Redux (State Management)", body: "actions, reducers, store" },
  {
    topic: "Docker (Containerization)",
    body: "containers, images, Dockerfile",
  },
  { topic: "GraphQL (API Query Language)", body: "schema, queries, mutations" },
  {
    topic: "Jest (JavaScript Testing Framework)",
    body: "unit testing, assertions",
  },
  {
    topic: "TypeScript (Typed JavaScript)",
    body: "interfaces, types, generics",
  },
  {
    topic: "Firebase (Backend as a Service)",
    body: "authentication, Firestore",
  },
  {
    topic: "Angular (JavaScript Framework)",
    body: "components, services, directives",
  },
  {
    topic: "Vue.js (JavaScript Framework)",
    body: "components, directives, Vuex",
  },
  { topic: "Web Accessibility", body: "aria, semantic HTML, focus management" },
  {
    topic: "CI/CD (Continuous Integration/Continuous Deployment)",
    body: "automated testing, deployment pipelines",
  },
];

// https://serverbyte.onrender.com/save
const DisplayPage = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [url, setUrl] = useState(`http://localhost:1200/get/${id}`);
  const inputRef = useRef(null);
  // const leftDivRef = useRef(null);
  const currentUrl = window.location.href;
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();
  // const [image, setImage] = useState("");
  // const [encode, setEncode] = useState("");
  // const [atu, setAtu] = useState(null);
  const [canvasRef, setCanvasRef] = useState(null);

  const handleCanvasRef = (canvas) => {
    setCanvasRef(canvas);
  };

  let newBody;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setData(res.data);
        newBody = topicsData.find((el) => el.topic === res.data.course);
        setBody(newBody.body);
        setTopic(newBody.topic);
        // Update the Open Graph meta tags dynamically
        // Assume you have an image URL and certificate page URL in the response
        const imageUrl =
        `http://localhost:1200/images/${id}`; // Replace with the actual image URL
        const certificateUrl = currentUrl; // Replace with the actual certificate page URL

        // Update the Open Graph meta tags dynamically
        const ogTitle = `ByteXL ${res.data.type} Certificate`;
        const ogImage = imageUrl;
        const ogUrl = certificateUrl;

        document.getElementById("meta-og-title").setAttribute("content", ogTitle);
        document.getElementById("meta-og-image").setAttribute("content", ogImage);
        document.getElementById("meta-og-url").setAttribute("content", ogUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url, id, currentUrl]);

  const handleCopyClick = () => {
    // console.log(inputRef.current)
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
    }
  };

  const handleTwitter = () => {
    window.open(
      "https://twitter.com/intent/tweet?url=https%3A%2F%2Ffront-bewomtvqt-ankits-projects-b7dffc9e.vercel.app%2Fdisplay%2F" +
        id
    );
  };
  console.log("idddd:",id)
  const handleLinkedin = () => {
    console.log("ankit");
  
    const imageId = id;  // Replace with the actual image ID
  
    fetch(`http://localhost:1200/images/${imageId}`)
      .then((res) => 
        res.json()
      )
      .then((res) => {
        console.log("res:",res)
        // Assuming the image data has a property named 'imageUrl'
        const imageUrl = res.imageUrl;

        const encodedImageUrl = encodeURIComponent(imageUrl);
        
        // Construct the LinkedIn sharing link
        const linkedinShareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedImageUrl}`;
  
        // Open the LinkedIn sharing link in a new tab
        window.open(linkedinShareLink, "_blank");
      })
      .catch((err) => {
        console.error("Error fetching image:", err);
      });
  };
  
  const shortenUrl = async (longUrl) => {
    const response = await fetch(`https://api-ssl.bitly.com/v4/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`,
      },
      body: JSON.stringify({ long_url: longUrl }),
    });
  
    const result = await response.json();
    console.log("result:",result)
    return result.id; // Shortened URL
  };
  
  //Normal Image

  const handleDownload = async() => {
    if (canvasRef) {
      const imageData = localStorage.getItem("certificate-image");

      if (imageData) {
        const link = document.createElement("a");
        link.href = imageData;
        console.log("link:", link.href);
        link.download = "certificate.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        //Original fetch if new not work
        // let img ="https://github-production-user-asset-6210df.s3.amazonaws.com/103572350/292956600-fa46a3b4-02e6-44d7-aeab-146d85d3ca2b.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231227%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231227T042623Z&X-Amz-Expires=300&X-Amz-Signature=551a81be52de3f85e56690d035437cb881cad95dabb929e7aed6e20200ec8858&X-Amz-SignedHeaders=host&actor_id=103572350&key_id=0&repo_id=497514745";
        const shortenedUrl = await shortenUrl(link.href);
        console.log("shortenedUrl:",shortenedUrl)
        let img=shortenedUrl

        fetch(`http://localhost:1200/update/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(img),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log("resbase updated successfully:", res);
          })
          .catch((error) => {
            console.error("Error updating database:", error);
          });

        //Original fetch if new not work
      } else {
        console.error("No image data found in localStorage.");
      }
    }
  };

  return (
    <>
      <Helmet>
        {/* Update meta tags, titles, and other head elements here */}
        <title>{`ByteXL ${data.type} Certificate`}</title>
        {/* Add more meta tags as needed */}
        <meta property="og:title" content="" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="" />
      </Helmet>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </button>
      <div className="containerStyle">
        <div className="canva">
          <CertificateCanvas data={data} handleCanvasRef={handleCanvasRef} />
        </div>
        <div className="rightDivStyle">
          {/* <h1>Right Div (30%)</h1> */}
          <div>
            <h2>Share this Certificate</h2>
          </div>
          <div className="social">
            {/* Icons for Twitter and LinkedIn */}
            <div onClick={() => handleTwitter()}>
              <img
                width={"80%"}
                src="https://hrcdn.net/fcore/assets/social_share/twitter-96e2c898ae.svg"
                alt="linkedin"
              />
            </div>
            <div onClick={() => handleLinkedin()}>
              <img
                width={"80%"}
                src="https://hrcdn.net/fcore/assets/social_share/linkedin-fd4be6309a.svg"
                alt="linkedin"
              />
            </div>
          </div>
          <div className="copyButtonStyle">
            <input
              type="text"
              value={currentUrl}
              ref={inputRef}
              readOnly
              style={{ width: "100%" }}
            />
            <button onClick={handleCopyClick}>Copy</button>
          </div>
          <div>
            <button style={{ padding: "0.3125rem" }} onClick={handleDownload}>
              Download
            </button>
          </div>
          <div>
            <h3>{topic}</h3>
          </div>
          <div>
            <p>{body}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayPage;
