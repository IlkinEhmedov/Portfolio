import { EmailOutlined, WhatsApp } from "@mui/icons-material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Footer.scss';

function Footer() {
  const message = encodeURIComponent(
    "Salam İlkin, portfolio saytınızı gördüm və əlaqə saxlamaq istəyirəm."
  );
  return (
    <footer>
      <div>
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
      <p>A portfolio designed & built by <a href="https://www.linkedin.com/in/ilkin-ahmadov-728460249/" target="_blank" rel="noreferrer">Ilkin Ahmadov</a> with 💜</p>
    </footer>
  );
}

export default Footer;