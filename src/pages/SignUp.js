import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useForm } from 'react-hook-form';

function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    async function onSubmit(data) {
        toggleError(false);
        toggleLoading(true);
        try {
          const result = await axios.post('http://localhost:3000/register', data);
            console.log(result.data);
            console.log("Registratie gelukt!")
            navigate('/profile');
          } catch(e) {
            console.error("Registratie mislukt", e);
            toggleError(true);
            <p className="error">Registreren mislukt</p>
          }
      toggleLoading(false);
    }

    // console.log('Errors', errors);

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>

      <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name-field">
                Emailadres:
                <input
                   type="email"
                   id="email-field"
                   {...register('email', {
                       required: "Dit veld is verplicht",
                       validate: (value) => value.includes('@') || "Emailadres moet een @ bevatten",
                   })}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}
          </label>
          <label htmlFor="password-field">
              Wachtwoord:
              <input
                type="password"
                id="password-field"
                {...register('password', {
                    required: "Dit veld is verplicht",
                    minLength: {
                        value: 6,
                        message: "Het wachtwoord moet minimaal 6 karakters bevatten",
                    }
                })}
            />
              {errors.password && <p className="error">{errors.password.message}</p>}
          </label>
          <label htmlFor="name-field">
              Gebruikersnaam:
              <input
                  type="text"
                  id="username-field"
                  {...register('username', {
                      required: "Dit veld is verplicht",
                      minLength: {
                          value: 3,
                          message: "De gebruikersnaam moet minimaal 3 karakters bevatten",
                      }
                  })}
              />
              {errors.username && <p className="error">{errors.username.message}</p>}
          </label>
          <button
              type="submit"
              className="form-button"
          >
              Registreren
          </button>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;