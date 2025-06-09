import 'boxicons/css/boxicons.min.css';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="homepage">
      {/* Enhanced Navbar */}
      <header className="navbar">
        <div className="navbar-container">
          <a href="#" className="brand-title">Hexaware</a>
          <ul className="nav-links">
            <li className="nav-item">Home</li>
            <li className="nav-item">About Us</li>
            <li className="nav-item">Projects</li>
            <li className="nav-item">Team</li>
            <li className="nav-item cta-btn">Get Started</li>
          </ul>
        </div>
      </header>

      {/* Hero section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Explore Project Details</h1>
            <p>
              The AI-Powered System digitizes and streamlines project tracking and team collaboration,
              enabling efficient planning, real-time monitoring, resource management, and performance analysis.
            </p>
            <Link to ="/chatbot"><button className="query-button">Ask a Query</button></Link>
          </div>

          <div className="hero-image">
            <img
              src="https://api.pictographic.io/images/notion/P05UDsdcYnlZCzsC8O0T.svg"
              alt="Project Overview"
              className="main-illustration"
            />
          </div>
        </div>
      </div>

      {/* Chatbot button */}
      <Link to="/chatbot"><div className="chatbot-wrapper">
        <button className="chatbot-button">
          <i className="bx bx-message-rounded-dots"></i>
        </button>
      </div></Link>
    </div>
  );
};

export default Home;