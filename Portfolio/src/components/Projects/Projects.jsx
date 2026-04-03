import React from "react";
import "./Projects.css";
import ProjectCard from "./ProjectCard";
import weatherApp from "../../Assests/weatherApp.png";
import qrCodeGenImg from "../../Assests/qrCodeGen.png";
import passWordGenImg from "../../Assests/passWordGen.png";
import instaImg from "../../Assests/instaUI.png";
import simonImg from "../../Assests/simonImg.png";
import spotifyImg from "../../Assests/spotifyImg.png";

const Projects = () => {
  const projectData = [
    {
      title: "Instagram UI",
      desc: "Instagram Home Page.",
      tech: ["HTML", "CSS", "JS"],
      image: instaImg,
      github:
        "https://github.com/dibyo20/JavaScript-Basic-Projects/tree/main/Insta-UI",
      live: "#",
    },
    {
      title: "Weather App",
      desc: "Real Time weather app.",
      tech: ["React", "HTML", "CSS", "JS"],
      image: weatherApp,
      github: "https://github.com/dibyo20/weather-app",
      live: "https://weather-app-topaz-tau-90.vercel.app/",
    },
    {
      title: "Simon's Game",
      desc: "Memory pattern game",
      tech: ["HTML", "CSS", "JS"],
      image: simonImg,
      github:
        "https://github.com/dibyo20/JavaScript-Basic-Projects/tree/main/Simon's%20Game",
      live: "#",
    },
    {
      title: "PassWord Generator",
      desc: "Simple and Secure Password Generator.",
      tech: ["HTML", "CSS", "JS"],
      image: passWordGenImg,
      github:
        "https://github.com/dibyo20/JavaScript-Basic-Projects/tree/main/Password%20Generator",
      live: "#",
    },
    {
      title: "Spotify UI",
      desc: "Spotify Home Page",
      tech: ["CSS", "HTML", "JS"],
      image: spotifyImg,
      github:
        "https://github.com/dibyo20/JavaScript-Basic-Projects/tree/main/Spotify%20UI",
      live: "#",
    },
    {
      title: "QR Code Generator",
      desc: "Generates QR Code for any type of URL.",
      tech: ["CSS", "HTML", "JS"],
      image: qrCodeGenImg,
      github:
        "https://github.com/dibyo20/JavaScript-Basic-Projects/tree/main/QR%20Code%20Generator",
      live: "#",
    },
  ];
  return (
    <div className="projects">
      <h2>Projects</h2>

      <div className="projects-container">
        {projectData.map((elem, index) => (
          <ProjectCard key={index} project={elem} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
