import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions/user';
import './Login.css'; // Importar o arquivo CSS

class Login extends Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
    error: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validateForm);
  };

  validateForm = () => {
    const { email, password } = this.state;
    const isDisabled = !email || !password;
    this.setState({ isDisabled });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { history, dispatchSaveEmail } = this.props;

    try {
      const BASE_URL = 'https://proven-promptly-chipmunk.ngrok-free.app/api/usuarios';
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Email ou senha inválidos');
      }

      const data = await response.json();
      const { token } = data;
      localStorage.setItem('token', token);
      dispatchSaveEmail(email);
      history.push('/cars');
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { email, password, isDisabled, error } = this.state;

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Password"
          />
          <button type="submit" disabled={isDisabled}>
            Login
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSaveEmail: (email) => dispatch(saveEmail(email)),
});

export default withRouter(connect(null, mapDispatchToProps)(Login));