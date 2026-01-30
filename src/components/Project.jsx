import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import Aos from "aos";
import "../assets/styles/Project.scss";
import { Link } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;

function Project() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Aos.init({ duration: 500, easing: "ease", once: true });
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`${API_URL}/portfolio`);
                const { data } = await res.json();
                setProjects(data);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return <p style={{ textAlign: "center" }}>Loading projects...</p>;
    }

    return (
        <div className="projects-container" id="projects">
            <Link to={'/login'} >
                <h1 data-aos="fade-down">Commercial Projects</h1>
            </Link>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div
                        className="project"
                        key={project._id}
                        data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                    >
                        <a
                            className="link"
                            href={project.link || "#"}
                            target={project.link && "_blank"}
                            rel="noreferrer"
                        >
                            <img
                                src={project.image}
                                className="zoom"
                                alt={project.title}
                                width="100%"
                            />

                            <div
                                className={`status ${project.isComplete ? "completed" : "ongoing"
                                    }`}
                            >
                                {project.isComplete ? "completed" : "ongoing"}
                            </div>
                        </a>

                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Project;
