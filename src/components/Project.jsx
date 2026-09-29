import mock04 from "../assets/images/mock04.png";
import mock05 from "../assets/images/mock05.png";
import mock06 from "../assets/images/mock06.png";
import mock07 from "../assets/images/mock07.png";
import mock08 from "../assets/images/mock08.png";
import mock02 from "../assets/images/mock02.png";
import mock10 from "../assets/images/mock10.png";
import mock03 from "../assets/images/mock03.png";
import "aos/dist/aos.css";
import Aos from "aos";
import "../assets/styles/Project.scss";
import { useEffect } from "react";

function Project() {
  useEffect(() => {
    Aos.init({ duration: 500, easing: "ease", once: true });
  }, []);
  return (
    <div className="projects-container" id="projects">
      <h1 data-aos="fade-down">Personal Projects</h1>
      <div className="projects-grid">
        <div className="project" data-aos="fade-right">
          <a
            className="link"
            href="https://www.proweb.az"
            target="_blank"
            rel="noreferrer"
          >
            <img src={mock10} className="zoom" alt="thumbnail" width="100%" />
            <div className="status completed">completed</div>
          </a>
          <a
            className="link"
            href="https://www.proweb.az"
            target="_blank"
            rel="noreferrer"
          >
            <h2>Proweb | Rəqəmsal həllər</h2>
          </a>
          <p>
            Modern corporate website developed using pure JavaScript, Bootstrap,
            and CSS, presenting company services, portfolio, blogs, news, and
            corporate content in a responsive layout.
          </p>
        </div>
        <div className="project" data-aos="fade-right">
          <a
            className="link"
            href="https://aquastores.net"
            target="_blank"
            rel="noreferrer"
          >
            <img src={mock03} className="zoom" alt="thumbnail" width="100%" />
            <div className="status completed">completed</div>
          </a>
          <a
            className="link"
            href="https://aquastores.net"
            target="_blank"
            rel="noreferrer"
          >
            <h2>
              AquaStores – B2B Marketplace for Pools, Spa & Water Technologies
            </h2>
          </a>
          <p>
            Source verified pool, spa and water-treatment suppliers. Compare
            products, services and companies on AquaStores.
          </p>
        </div>
        <div className="project" data-aos="fade-right">
          <a className="link" href="https://judo.az">
            <img src={mock05} className="zoom" alt="thumbnail" width="100%" />
            <div className="status completed">completed</div>
          </a>
          <a className="link" href="https://judo.az">
            <h2>Ajerbaijan Judo Federation</h2>
          </a>
          <p>
            Developed the official Azerbaijan Judo Federation website,
            presenting federation news, events, athlete information, competition
            results, and organizational content with a modern, responsive
            design.
          </p>
        </div>
        <div className="project" data-aos="fade-left">
          <a
            className="link"
            href="https://texnotech.az/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={mock02} className="zoom" alt="thumbnail" width="100%" />
            <div className="status completed">completed</div>
          </a>
          <a
            className="link"
            href="https://texnotech.az/"
            target="_blank"
            rel="noreferrer"
          >
            <h2>TexnoTech - məişət texnikası və elektronika onlayn mağazası</h2>
          </a>
          <p>
            Smartfon, noutbuk, televizor və məişət texnikası - rəsmi zəmanət,
            faizsiz taksit və Azərbaycan üzrə çatdırılma. TexnoTech onlayn
            mağazası.
          </p>
        </div>
        <div className="project" data-aos="fade-left">
          <a
            className="link"
            href="https://www.melhemhospital.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={mock07} className="zoom" alt="thumbnail" width="100%" />
            <div className="status completed">completed</div>
          </a>
          <a
            className="link"
            href="https://www.melhemhospital.com/"
            target="_blank"
            rel="noreferrer"
          >
            <h2>Melhem International Hospital</h2>
          </a>
          <p>
            Built a dynamic hospital website with user login and registration,
            doctor profile management, appointment scheduling, and detailed
            service and patient information.
          </p>
        </div>
        <div className="project" data-aos="fade-right">
          <a
            className="link"
            href="https://hertz.org.az/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={mock06} className="zoom" alt="thumbnail" width="100%" />
            <div className="status completed">completed</div>
          </a>
          <a
            className="link"
            href="https://hertz.org.az/"
            target="_blank"
            rel="noreferrer"
          >
            <h2>Hertz Azerbaijan</h2>
          </a>
          <p>
            Built a rent-a-car website presenting car rentals, airport
            transfers, regional transfers, chauffeur services, and tours with a
            responsive and intuitive design.
          </p>
        </div>
        <div className="project" data-aos="fade-left">
          <a
            className="link"
            href="https://nnservice.az"
            target="_blank"
            rel="noreferrer"
          >
            <img src={mock08} className="zoom" alt="thumbnail" width="100%" />
            <div className="status completed">completed</div>
          </a>
          <a
            className="link"
            href="https://nnservice.az"
            target="_blank"
            rel="noreferrer"
          >
            <h2>NN Service</h2>
          </a>
          <p>
            Developed a service website for a household appliance repair
            company, presenting repair services for refrigerators, boilers,
            washing machines, and air conditioners with an easy booking system.
          </p>
        </div>
        <div className="project" data-aos="fade-right">
          <a className="link" href="javascript:void(0)">
            <img src={mock04} className="zoom" alt="thumbnail" width="100%" />
            <div className="status ongoing">ongoing</div>
          </a>
          <a className="link" href="javascript:void(0)">
            <h2>Alpi Mobile</h2>
          </a>
          <p>
            Developed the Alpi Mobile website under Bakcell, providing users
            with the ability to order mobile phones and SIM numbers through a
            clean, user-friendly interface.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Project;
