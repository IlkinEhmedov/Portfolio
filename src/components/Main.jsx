import { EmailOutlined, WhatsApp, } from '@mui/icons-material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import avatar from "../assets/images/portfolio.jpeg";
import '../assets/styles/Main.scss';
import Aos from 'aos';
import "aos/dist/aos.css";
import myCv from "../assets/cv/CV.pdf"

function Main() {

  Aos.init({ duration: 500, easing: "ease" })
  Aos.refresh()

  const handleViewCV = () => {
    window.open(myCv, '_blank');
  };

  return (
    <div className="container ">
      <div className="about-section">
        <div className="image-wrapper" data-aos="fade-up">
          <img src={avatar} alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons" data-aos="fade-up">
            <a href="mailto:ilkin656.u@gmail.com" target="_blank" rel="noreferrer"><EmailOutlined /></a>
            <a href="https://www.linkedin.com/in/ilkin-ahmadov-728460249/" target="_blank" rel="noreferrer"><LinkedInIcon /></a>
            <a href="https://wa.me/+994505798656" target="_blank" rel="noreferrer"><WhatsApp /></a>
          </div>
          <h1>Ilkin Ahmadov</h1>
          <p>Frontend Developer</p>
          
          <button className='view' onClick={handleViewCV}>View my CV</button>

          <div className="mobile_social_icons">
            <a href="mailto:ilkin656.u@gmail.com" target="_blank" rel="noreferrer"><EmailOutlined /></a>
            <a href="https://www.linkedin.com/in/ilkin-ahmadov-728460249/" target="_blank" rel="noreferrer"><LinkedInIcon /></a>
            <a href="https://wa.me/+994505798656" target="_blank" rel="noreferrer"><WhatsApp /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
