import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

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

const Frontpage = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [course, setCourse] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [tag,setTag]=useState("")
  const navigate=useNavigate()
  

  const handleTopicChange = (event) => {
    setCourse(event.target.value);
  };
  const handleGenerate=()=>{
    let obj={
      name:name,type:type,course:course,linkedin:linkedin
    }

    
    const ogTitle = document.getElementById('meta-og-title');
    const ogImage = document.getElementById('meta-og-image');
    const ogUrl = document.getElementById('meta-og-url');

    ogTitle.setAttribute('content', `ByteXL ${type} Certificate`);
    ogImage.setAttribute('content', `URL_of_the_certificate_image`);
    ogUrl.setAttribute('content', `URL_of_the_certificate_page`);
   
    fetch("http://localhost:1200/save",{
      method:"POST",
      body:JSON.stringify(obj),
      headers:{
        "Content-Type":"application/json"
      }
    }).then(res=>res.json()).then(res=>{
      // console.log(res)
      setTag(`${name}_${type}`)
      setTimeout(()=>{
        navigate(`/display/${res.data._id}`)
      },3000)
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <div>
      <h1>form page</h1>
      <Helmet>
          
          <title>{`${tag}`}</title>
          <meta name="description" content="Description of your page" />
          <meta property="og:title" content={`ByteXL ${type} Certificate`} />
          
        </Helmet>
      <div>
        Name:{" "}
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        Type:{" "}
        <input
          type="text"
          placeholder="Enter type of certificate"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>
      <div>
        Course:{" "}
        <select id="topicSelect" value={course} onChange={handleTopicChange}>
        <option value="">Select a topic</option>
        {topicsData.map((topicObj) => (
          <option key={topicObj.topic} value={topicObj.topic}>
            {topicObj.topic}
          </option>
        ))}
      </select>
      </div>
      <div>
        LinkedIn:{" "}
        <input
          type="text"
          placeholder="Enter linkedin username"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
      </div>
      <button onClick={handleGenerate}>Generate Certificate</button>
    </div>
  );
};

export default Frontpage;
