import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions/user';

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
      const BASE_URL = 'api/usuarios';
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  handleLogout = () => {
    localStorage.removeItem('token');
    this.props.history.push('/login');
  };

  render() {
    const { email, password, isDisabled, error } = this.state;
    const classButton = 'p-2 bg-blue-500 text-white';

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input
            data-testid="email-input"
            placeholder="Email"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            className="p-1 border"
          />
          <input
            data-testid="password-input"
            placeholder="Senha"
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            className="p-1 border"
          />
          <button
            type="submit"
            disabled={ isDisabled }
            className={ classButton }
          >
            Entrar
          </button>
        </form>
        { error && <p>{ error }</p> }
        <button onClick={ this.handleLogout } className={ classButton }>
          Logout
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSaveEmail: (email) => dispatch(saveEmail(email)),
});

export default withRouter(connect(null, mapDispatchToProps)(Login));