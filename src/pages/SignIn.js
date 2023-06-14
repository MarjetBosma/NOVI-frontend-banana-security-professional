import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import axios from "axios";


function SignIn() {
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, toggleError] = useState(false);
  const [loading, toggleLoading] = useState(false);
  const navigate = useNavigate();
  ;
    async function onSubmit(data) {
        toggleError(false);
        toggleLoading(true);
        try {
            const result = await axios.post('http://localhost:3000/login', {
                email: email,
                password: password,
            });
                console.log(result.data);
                navigate('/profile');
                login(result.data.accessToken);
            } catch(e) {
                console.error(e);
                toggleError(true);
            }
        toggleLoading(false);
    }

    console.log('Errors', errors);

    return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email-field">
              Emailadres:
              <input
                  type="email"
                  id="email-field"
                  {...register("email", {
                      required: "Dit veld is verplicht",
                      validate: (value) => value.includes('@'),
                  })}
              />
              errors.email && <p>{errors.email.message}</p>
          </label>
          <label htmlFor="password-field">
              Wachtwoord:
              <input
                  type="password"
                  id="password-field"
                  {...register("password", {
                      required: "Dit veld is verplicht",
              })}
              />
              errors.password && <p>{errors.password.message}</p>
          </label>
          {error && <p className="error">Combinatie van emailadres en wachtwoord is onjuist</p>}
          <button
              type="submit"
              className="form-button"
          >
              Inloggen
          </button>

      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;