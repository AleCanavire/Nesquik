import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { ReactComponent as NetflixLogo } from "../../assets/images/nesquik.svg";
import { ReactComponent as GlobeIcon } from "../../assets/images/globe.svg";
import { ReactComponent as ArrowDown } from "../../assets/images/arrow-select.svg";
import { ReactComponent as Spinner } from "../../assets/images/spinner.svg";

function Login() {
  const { googleSignIn } = UserAuth();
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async() => {
    setLoading(true);
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-background">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/39f3c979-c105-4948-9c51-611eedf3a6fd/49e5f91b-8a03-4e7b-ab38-874852fbb9af/AR-es-20230612-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="background movies"/>
      </div>
      <div className="login-header">
        <Link className="nesquik-logo" to="/">
          <NetflixLogo/>
        </Link>
      </div>
      <div className="login-body">
        <div className="login-content">
          <div className="login-form-main">
            <h1 className="login-page-title">Inicia sesión</h1>
            <form className="login-form">
              <div className="login-input-email">
                <div className="input-wrapper">
                  <label className="email-phone">
                    <input className="textField" type="text" name="userLogin" id="userLoginId" autoComplete="email" required/>
                    <label className="placeLabel" htmlFor="userLoginId">
                      Email o número de teléfono
                    </label>
                  </label>
                </div>
              </div>
              <div className="login-input-password">
                <div className="input-wrapper">
                  <label className="password">
                    <input className="textField" type="password" name="password" id="passwordId" autoComplete="password" maxLength="60" required/>
                    <label className="placeLabel" htmlFor="passwordId">
                      Contraseña
                    </label>
                  </label>
                </div>
              </div>
            </form>
            <button className={`btn-login ${loading ? "disabled" : ""}`} onClick={signInWithGoogle} disabled={loading}>
              <div className="btn-content">
                Iniciar sesión
                { loading
                  ? <Spinner className="loading-indicator"/>
                  : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-google" viewBox="0 0 16 16"> <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" fill="white"></path></svg>
                }
              </div>
            </button>
            <div className="login-form-help">
              <div className="login-remember-me">
                <input type="checkbox" name="remember-me" />
                <label htmlFor="remember-me">Recuérdame</label>
              </div>
              <span className="login-help-link">¿Necesitas ayuda?</span>
            </div>
          </div>
          <div className="login-form-other">
            <div className="login-signup-now">
              ¿Primera vez en Netflix? <span>Suscribete ahora</span>
            </div>
            <p className="recaptcha-terms-of-use">Esta página está protegida por Google reCAPTCHA para comprobar que no eres un robot. <span>Más info.</span></p>
          </div>
        </div>
      </div>
      <footer className="login-footer-wrapper">
        <div className="login-footer">
          <p className="footer-top">¿Preguntas? Llama a <a href="https://www.linkedin.com/in/alexander-canavire/" target="blank">Alexander Canavire</a></p>
          <ul className="footer-links">
            <li className="footer-link-item"><span>Preguntas frecuentes</span></li>
            <li className="footer-link-item"><span>Centro de ayuda</span></li>
            <li className="footer-link-item"><span>Términos de uso</span></li>
            <li className="footer-link-item"><span>Privacidad</span></li>
            <li className="footer-link-item"><span>Preferencias de cookies</span></li>
            <li className="footer-link-item"><span>Información corporativa</span></li>
          </ul>
          <div className="select-wrapper">
            <div className="select-arrow">
              <GlobeIcon className="globe"/>
              <select className="select">
                <option value="Español" lang="es">Español</option>
                <option value="English" lang="en">English</option>
              </select>
              <ArrowDown className="arrow"/>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Login