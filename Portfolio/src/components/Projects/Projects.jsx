import React from "react";
import "./Projects.css";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const projectData = [
    {
      title: "Stock Trading Platform",
      desc: "Stock trading dashboard.",
      tech: ["React", "Node.js", "MongoDB"],
      image: "/projects/stock.png",
      github: "#",
      live: "#",
    },
    {
      title: "Task Manager",
      desc: "Task manager with filters and clean UI.",
      tech: ["React", "CSS", "HTML", "JS"],
      image: "/projects/task.png",
      github: "#",
      live: "#",
    },
    {
      title: "Weather App",
      desc: "Real Time weather app.",
      tech: ["React", "HTML", "CSS", "JS"],
      image: "/projects/stock.png",
      github: "#",
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
