// src/App.js

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import Home from './components/Home'; // Adjust path as needed
import LoginPage from './components/LoginForm'; // Adjust path as needed

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />

      </Routes>
    </Router>
  );
};

export default App;
