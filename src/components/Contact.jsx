import emailjs from '@emailjs/browser';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {  useRef, useState } from 'react';
import toast, { LoaderIcon } from 'react-hot-toast';
import '../assets/styles/Contact.scss';
import Aos from "aos";
import "aos/dist/aos.css"

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [isLoading, setisLoading] = useState(false);

  const form = useRef();

  const validate = () => {
    const _name = name.trim();
    const _email = email.trim();
    const _message = message.trim();

    if (!_name) {
      toast.error("Please fill name field");
      return false;
    }
    if (!_email) {
      toast.error("Please fill email field");
      return false;
    }
    if (!_message) {
      toast.error("Please fill message field");
      return false;
    }

    if (_name.length < 2) {
      toast.error("Name must be at least 2 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(_email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (_message.length < 10) {
      toast.error("Message must be at least 10 characters");
      return false;
    }

    return true;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setisLoading(true)

    if (!validate()) {
      setisLoading(false);
      return;
    }

    const now = new Date();
    const formatted = now
      .toLocaleDateString("en-GB")
      .replace(/\./g, '/');

    const templateParams = {
      time: formatted,
      name: name,
      email: email,
      message: message,
      title: "Contact Form Message",
    };

    emailjs
      .send(
        "service_nu63t2j",
        "template_oio56rj",
        templateParams,
        "rrxLwbavmOR8uj7V8"
      )
      .then(
        () => {

          setName("");
          setEmail("");
          setMessage("");
          setisLoading(false)
          toast.success('Message successfully sent!')
        },
        (error) => {
          setisLoading(false)
          console.error("Email Send Error:", error);
        }
      );
  };

  Aos.init({ duration: 500, easing: "ease" })

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1 data-aos="fade-up">Contact Me</h1>
          <p data-aos="fade-up">Got a project waiting to be realized? Let's collaborate and make it happen!</p>

          <Box
            ref={form}
            component="form"
            noValidate
            autoComplete="off"
            className="contact-form"
            data-aos="fade-up"
          >
            <div className="form-flex">
              <input
                className="form-input"
                required
                placeholder="What's your name?"
                value={name}
                type='text'
                name='name'
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="form-input"
                required
                placeholder="How can I reach you? (email)"
                value={email}
                name='email'
                type='email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <textarea
              required
              placeholder="Send me any inquiries or questions"
              rows={10}
              className="body-form form-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <Button disabled={isLoading} variant="contained" endIcon={isLoading ? <LoaderIcon className='loader' /> : <SendIcon />} onClick={sendEmail}>
              {isLoading ? "Sending" : "Send"}
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Contact;
