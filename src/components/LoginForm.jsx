// src/components/LoginPage.jsx

import axios from 'axios';
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../styles/login.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: '',
      password: '',
      remember: false,
      error: '',
      redirect: false,
    };
  }

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState({ [name]: type === 'checkbox' ? checked : value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { employeeId, password } = this.state;

    if (!employeeId || !password) {
      this.setState({ error: 'Employee ID and Password are required' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/login', {
        employeeId,
        password,
      });

      const { token, role } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      this.setState({ redirect: true });
    } catch (error) {
      this.setState({ error: 'Login failed. Please check your credentials.' });
      console.error('Login error:', error);
    }
  };

  render() {
    if (this.state.redirect) return <Navigate to="/chatbot" />;

    return (
      <div className="login-root">
        <div className="box-root flex-flex flex-direction--column" style={{ minHeight: '100vh', flexGrow: 1 }}>
          <div className="loginbackground box-background--white padding-top--64">
            <div className="loginbackground-gridContainer" />
          </div>

          <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{ flexGrow: 1, zIndex: 9 }}>
            <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
              <h1><a href="#">Project Xplore</a></h1>
            </div>

            <div className="formbg-outer">
              <div className="formbg">
                <div className="formbg-inner padding-horizontal--48">
                  <span className="padding-bottom--15">Sign in to your account</span>
                  <br></br>
                  <br></br>
                  <form onSubmit={this.handleSubmit}>
                    <div className="field padding-bottom--24">
                      <label htmlFor="employeeId">Employee ID</label>
                      <input
                        type="text"
                        name="employeeId"
                        value={this.state.employeeId}
                        onChange={this.handleChange}
                        required
                      />
                    </div>

                    <div className="field padding-bottom--24">
                      <div className="grid--50-50">
                        <label htmlFor="password">Password</label>
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                      />
                    </div>

                    <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                      <label htmlFor="checkbox">
                        <input
                          type="checkbox"
                          name="remember"
                          checked={this.state.remember}
                          onChange={this.handleChange}
                        />
                        Stay signed in for a week
                      </label>
                    </div>

                    {this.state.error && (
                      <div style={{ color: 'red', marginBottom: '10px' }}>{this.state.error}</div>
                    )}

                    <div className="field padding-bottom--24">
                   <Link to = "/home"> <input type="submit" name="submit" value="Continue" /></Link>  
                    </div>
                  </form>
                </div>
              </div>

              <div className="footer-link padding-top--24">
                <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                  <span><a href="#">© ProjectXplore</a></span>
                  <span><a href="#">Contact</a></span>
                  <span><a href="#">Privacy & terms</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
