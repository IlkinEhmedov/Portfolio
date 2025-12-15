import { faGitAlt, faNode, faReact } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Chip from '@mui/material/Chip';
import Aos from "aos";
import "aos/dist/aos.css";
import '../assets/styles/Expertise.scss';

const labelsFirst = [
    "HTML5",
    "CSS3",
    "SCSS",
    "Bootstrap",
    "TailwindCSS",
    "Material UI",
    "Chakra UI",
    "JavaScript (ES6+)",
    "TypeScript",
    "jQuery",
    "React.js",
    "Context API",
    "Redux Toolkit",
    "Thunk",
    "Next.js (SSR / SSG / ISR)"
];

const labelsSecond = [
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "RESTful APIs",
    "JSON",
    "Socket.io",
    "OpenAI"
];


const labelsThird = [
    "Git",
    "GitHub",
    "GitLab"
];


function Expertise() {
    Aos.init({ duration: 500, easing: "ease" })
    return (
        <div className="container" id="expertise">
            <div className="skills-container">
                <h1 data-aos="fade-up">Expertise</h1>
                <div className="skills-grid">
                    <div className="skill" data-aos="fade-up">
                        <FontAwesomeIcon icon={faReact} size="3x" />
                        <h3>Frontend Development</h3>
                        <p>I create responsive, user-focused, and visually engaging interfaces using modern frontend technologies. My work includes building dynamic components, optimizing performance, ensuring cross-browser compatibility, and delivering clean, scalable UI architectures for seamless user experiences.</p>
                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            {labelsFirst.map((label, index) => (
                                <Chip key={index} className='chip' label={label} />
                            ))}
                        </div>
                    </div>

                    <div className="skill" data-aos="fade-up">
                        <FontAwesomeIcon icon={faNode} size="3x" />
                        <h3>Backend Development</h3>
                        <p>I develop secure, scalable, and high-performance backend systems using modern server-side technologies. My expertise includes RESTful API development, database modeling, real-time communication, authentication, and building robust architectures that power reliable business applications.</p>
                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            {labelsSecond.map((label, index) => (
                                <Chip key={index} className='chip' label={label} />
                            ))}
                        </div>
                    </div>

                    <div className="skill" data-aos="fade-up">
                        <FontAwesomeIcon icon={faGitAlt} size="3x" />
                        <h3>Version Control Systems (VCS)</h3>
                        <p>I use industry-standard version control practices to manage code efficiently, collaborate across teams, and maintain clean development workflows. My experience includes branch management, CI/CD integration, and maintaining stable repositories across Git, GitHub, and GitLab environments.</p>
                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            {labelsThird.map((label, index) => (
                                <Chip key={index} className='chip' label={label} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Expertise;