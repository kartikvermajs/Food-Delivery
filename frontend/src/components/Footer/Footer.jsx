import './Footer.css'
import { Github, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <Link to="/" className="logo-link">
            <h1 className="logo-text">Mealio .</h1>
          </Link>
          <p>This website is made for learning purpose.</p>

          <div className="footer-social-icons">
            <a href="https://github.com/kartikvermajs" target="_blank" rel="noopener noreferrer">
              <Github size={30} />
            </a>

            <a href="https://www.linkedin.com/in/kartik-verma-4b99012b8" target="_blank" rel="noopener noreferrer">
              <Linkedin size={30} />
            </a>

            <a href="https://www.instagram.com/_kenpachi_.z/" target="_blank" rel="noopener noreferrer">
              <Instagram size={30} />
            </a>
          </div>
        </div>

        <div className="footer-content-center">
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>kartikverma88273@outlook.com</li>
          </ul>
        </div>

      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 @ Mealio.com - All Right Reserved</p>
    </div>
  )
}

export default Footer