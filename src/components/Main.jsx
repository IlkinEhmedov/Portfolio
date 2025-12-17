import { EmailOutlined, WhatsApp, } from '@mui/icons-material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import avatar from "../assets/images/portfolio.jpeg";
import '../assets/styles/Main.scss';
import myCv from "../assets/cv/CV.pdf"

function Main() {


  const handleViewCV = () => {
    window.open(myCv, '_blank');
  };
  const message = encodeURIComponent(
    "Salam İlkin, portfolio saytınızı gördüm və əlaqə saxlamaq istəyirəm."
  );

  return (
    <div className="container ">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={avatar} alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="mailto:ilkin656.u@gmail.com" target="_blank" rel="noreferrer"><EmailOutlined /></a>
            <a href="https://www.linkedin.com/in/ilkin-ahmadov-728460249/" target="_blank" rel="noreferrer"><LinkedInIcon /></a>
            <a
              href={`https://wa.me/994505798656?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsApp />
            </a>

          </div>
          <h1>Ilkin Ahmadov</h1>
          <p>Frontend Developer</p>

          <button className='view' onClick={handleViewCV}>View my CV</button>

          <div className="mobile_social_icons">
            <a href="mailto:ilkin656.u@gmail.com" target="_blank" rel="noreferrer"><EmailOutlined /></a>
            <a href="https://www.linkedin.com/in/ilkin-ahmadov-728460249/" target="_blank" rel="noreferrer"><LinkedInIcon /></a>
            <a
              href={`https://wa.me/994505798656?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsApp />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
