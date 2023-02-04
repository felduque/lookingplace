import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import validateForm from "./validate.js";
import { Link } from "react-router-dom";
//import "../../../index.css";

export default function SignUp() {
  const [inputs, setInputs] = useState({
    fullName: "",
    password: "",
    password2: "",
    email: "",
    phone: null,
  });

  const [validCaptcha, setValidCaptcha] = useState(false);

  let allDataUser = {
    fullName: inputs.fullName,
    password: inputs.password,
    email: inputs.email,
    phone: inputs.phone,
  };

  const [errors, setErrors] = useState({});
  const errorsLength = Object.entries(errors).length;

  //Cambia estados de error e input. Llama a ValidateForm
  function handleChange(event) {
    event.preventDefault();

    setInputs({ ...inputs, [event.target.name]: event.target.value }); //Acceder al name del elemento, y guardar value

    setErrors(
      validateForm({ ...inputs, [event.target.name]: event.target.value })
    );
  }
  //ReCaptcha
  const captcha = useRef(null);
  console.log("Captcha: ", validCaptcha);
  const onChangeCaptcha = () => {
    if (captcha.current.getValue()) {
      setValidCaptcha(true);
      console.log("Captcha: ", validCaptcha);
    }
  };

  //Controlador de envío
  function handleSubmit(evt) {
    evt.preventDefault();
    if (
      !inputs.fullName ||
      !inputs.password ||
      !inputs.password2 ||
      !inputs.email ||
      !inputs.phone ||
      !validCaptcha ||
      errorsLength !== 0
    ) {
      alert("Ups! Fill out the entire form.");
    } else {
      setErrors(
        validateForm({
          ...inputs,
          [evt.target.name]: evt.target.value,
        })
      );
      //ENVÍO
      createUser(allDataUser);
      alert("SignUp Sucess");
      setInputs({
        fullName: "",
        password: "",
        password2: "",
        email: "",
        phone: null,
      });
    }
  }

  async function createUser(dataUser) {
    try {
      await axios.post("http://localhost:3000/client/createuser", dataUser);
    } catch (err) {
      console.error(err, "Error create new user");
    }
  }

  useEffect(() => {
    setErrors(validateForm(inputs));
  }, [inputs]);

  return (
    <div>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
              <p>
                <input
                  type="text"
                  name="fullName"
                  class={ errors.name ? 'input is-danger' : 'input is-success' }
                  value={inputs.fullName}
                  placeholder="Nombre completo"
                  onChange={(event) => handleChange(event)}
                />
                {errors.name ? (
                  <p>
                    <span className="error">{errors.name}</span>
                  </p>
                ) : null}
              </p>
              <p>
                <input
                  type="password"
                  name="password"
                  class={ errors.password ? 'input is-danger' : 'input is-success' }
                  value={inputs.password}
                  placeholder="Contraseña"
                  onChange={(event) => handleChange(event)}
                />
                {errors.password ? (
                  <p>
                    <span className="error">{errors.password}</span>
                  </p>
                ) : null}
              </p>
              <p>
                <input
                  type="password"
                  name="password2"
                  class={ errors.password2 ? 'input is-danger' : 'input is-success' }
                  value={inputs.password2}
                  placeholder="Repetir contraseña"
                  onChange={(event) => handleChange(event)}
                />
                {errors.password2 ? (
                  <p>
                    <span className="error">{errors.password2}</span>
                  </p>
                ) : null}
              </p>
              <p>
                <input
                  type="text"
                  name="email"
                  class={ errors.mail ? 'input is-danger' : 'input is-success' }
                  value={inputs.email}
                  placeholder="Correo electrónico"
                  onChange={(event) => handleChange(event)}
                />
                {errors.mail ? (
                  <p>
                    <span className="error">{errors.mail}</span>
                  </p>
                ) : null}
              </p>
              <p>
                <label>Número de teléfono </label>
                <input
                  type="text"
                  name="phone"
                  class={ errors.phone ? 'input is-danger' : 'input is-success' }
                  value={inputs.phone}
                  placeholder="Teléfono"
                  onChange={(event) => handleChange(event)}
                />
                {errors.phone ? (
                  <p>
                    <span className="error">{errors.phone}</span>
                  </p>
                ) : null}
              </p>
              <p>
                <ReCAPTCHA
                  ref={captcha}
                  sitekey="6Le2F0EkAAAAAPCok1gCfpggSPFK8oKRBI5GDSAE"
                  onChange={onChangeCaptcha}
                />
              </p>
              <p></p>

              <p>
                <button
                  type="submit"
                  disabled={
                    !inputs.fullName ||
                    !inputs.password ||
                    !inputs.password2 ||
                    !inputs.email ||
                    !inputs.phone ||
                    !validCaptcha ||
                    errorsLength !== 0
                  }
                >
                  Registrarme
                </button>
              </p>
              <div>
                <p>¿Ya estás registrado?</p>
                <Link to="/">Inicia sesión</Link>
              </div>
          </form>
          </div>
      </div>
    </div>
  );
}
