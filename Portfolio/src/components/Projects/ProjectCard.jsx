import React from "react";
import "./ProjectCard.css";

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-image">
        <img src={project.image} alt={project.title} />
      </div>

      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.desc}</p>

        <div className="tech-stack">
          {project.tech.map((tech, i) => (
            <span key={i}>{tech}</span>
          ))}
        </div>

        <div className="project-buttons">
          <a href={project.live}>Live</a>
          <a href={project.github}>GitHub</a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
