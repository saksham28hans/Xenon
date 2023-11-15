import React, { useState } from 'react';
import axios from "axios";
import emails from './assets/email.png';
import mobile from './assets/mobile.png';

// import { client } from '../../client';
import './ContactUs.scss';

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const { username, email, message } = formData;
    const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});
    const handleChangeInput = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async() => {
      setLoading(true);
  
      const contact = {
        _type: 'contact',
        name: formData.username,
        email: formData.email,
        message: formData.message,
      };
      const res = await axiosInstance.post("contact", contact);
      setIsFormSubmitted(true);
  
    //   client.create(contact)
    //     .then(() => {
    //       setLoading(false);
    //       setIsFormSubmitted(true);
    //     })
    //     .catch((err) => console.log(err));
    };
  
    return (
      <div className='contactUsContainer'>
        <h2 className="head-text-footer">Contact Us
        </h2>
  
        <div className="app__footer-cards">
          <div className="app__footer-card ">
            <img src={emails} alt="email" />
            <a href="mailto:hello@micael.com" className="p-text">Nitin@gmail.com</a>
          </div>
          <div className="app__footer-card">
            <img src={mobile} alt="phone" />
            <a href="tel:+1 (123) 456-7890" className="p-text">+91 9123456789</a>
          </div>
        </div>
        {!isFormSubmitted ? (
          <div className="app__footer-form app__flex">
            <div className="app__flex">
              <input className="p-text" type="text" placeholder="Your Name" name="username" value={username} onChange={handleChangeInput} />
            </div>
            <div className="app__flex">
              <input className="p-text" type="email" placeholder="Your Email" name="email" value={email} onChange={handleChangeInput} />
            </div>
            <div>
              <textarea
                className="p-text"
                placeholder="Your Message"
                value={message}
                name="message"
                onChange={handleChangeInput}
              />
            </div>
            <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Send Message' : 'Sending...'}</button>
          </div>
        ) : (
          <div>
            <h3 className="head-text">
              Thank you for getting in touch!
            </h3>
          </div>
        )}
      </div>
    );
}

export default ContactUs;