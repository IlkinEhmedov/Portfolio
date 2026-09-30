import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "../assets/styles/Project.scss";

import mock02 from "../assets/images/mock02.png";
import mock03 from "../assets/images/mock03.png";
import mock04 from "../assets/images/mock04.png";
import mock05 from "../assets/images/mock05.png";
import mock06 from "../assets/images/mock06.png";
import mock07 from "../assets/images/mock07.png";
import mock08 from "../assets/images/mock08.png";
import mock10 from "../assets/images/mock10.png";

const projects = [
  {
    id: "judo",
    title: "Azerbaijan Judo Federation",
    image: "mock05",
    url: "https://judo.az",
    status: "completed",
    description:
      "Developed the official Azerbaijan Judo Federation website, presenting federation news, events, athlete information, competition results, and organizational content with a modern, responsive design.",
  },
  {
    id: "proweb",
    title: "Proweb | Rəqəmsal həllər",
    image: "mock10",
    url: "https://www.proweb.az",
    status: "completed",
    description:
      "Modern corporate website developed using pure JavaScript, Bootstrap, and CSS, presenting company services, portfolio, blogs, news, and corporate content in a responsive layout.",
  },
  {
    id: "aquastores",
    title: "AquaStores – B2B Marketplace for Pools, Spa & Water Technologies",
    image: "mock03",
    url: "https://aquastores.net",
    status: "completed",
    description:
      "Source verified pool, spa and water-treatment suppliers. Compare products, services and companies on AquaStores.",
  },
  {
    id: "texnotech",
    title: "TexnoTech - məişət texnikası və elektronika onlayn mağazası",
    image: "mock02",
    url: "https://texnotech.az/",
    status: "completed",
    description:
      "Smartfon, noutbuk, televizor və məişət texnikası - rəsmi zəmanət, faizsiz taksit və Azərbaycan üzrə çatdırılma. TexnoTech onlayn mağazası.",
  },
  {
    id: "melhem",
    title: "Melhem International Hospital",
    image: "mock07",
    url: "https://www.melhemhospital.com/",
    status: "completed",
    description:
      "Built a dynamic hospital website with user login and registration, doctor profile management, appointment scheduling, and detailed service and patient information.",
  },
  {
    id: "hertz",
    title: "Hertz Azerbaijan",
    image: "mock06",
    url: "https://hertz.org.az/",
    status: "completed",
    description:
      "Built a rent-a-car website presenting car rentals, airport transfers, regional transfers, chauffeur services, and tours with a responsive and intuitive design.",
  },
  {
    id: "nnservice",
    title: "NN Service",
    image: "mock08",
    url: "https://nnservice.az",
    status: "completed",
    description:
      "Developed a service website for a household appliance repair company, presenting repair services for refrigerators, boilers, washing machines, and air conditioners with an easy booking system.",
  },
  {
    id: "alpi",
    title: "Alpi Mobile",
    image: "mock04",
    url: null,
    status: "ongoing",
    description:
      "Developed the Alpi Mobile website under Bakcell, providing users with the ability to order mobile phones and SIM numbers through a clean, user-friendly interface.",
  },
];

const images = {
  mock02,
  mock03,
  mock04,
  mock05,
  mock06,
  mock07,
  mock08,
  mock10,
};

function ProjectLink({ url, className, children }) {
  if (!url) {
    return <span className={className}>{children}</span>;
  }
  return (
    <a className={className} href={url} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function Project() {
  useEffect(() => {
    Aos.init({ duration: 500, easing: "ease", once: true });
  }, []);

  return (
    <div className="projects-container" id="projects">
      <h1 data-aos="fade-down">Personal Projects</h1>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div
            className="project"
            key={project.id}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <ProjectLink url={project.url} className="link image">
              <img
                src={images[project.image]}
                className="zoom"
                alt={project.title}
                width="100%"
              />
              <div className={`status ${project.status}`}>{project.status}</div>
            </ProjectLink>
            <ProjectLink url={project.url} className="link">
              <h2>{project.title}</h2>
            </ProjectLink>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;
