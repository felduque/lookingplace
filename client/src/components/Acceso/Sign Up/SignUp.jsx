import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import validateForm from "./validate.js";
import { Link } from "react-router-dom";
import "../../../index.css";

export default function SignUp() {
  const [inputs, setInputs] = useState({
    fullName: "",
    password: "",
    password2: "",
    email: "",
    phone: 0,
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
        phone: 0,
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
    <div className="sectionSignUp">
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>SignUp</legend>
              <p>
                <input
                  type="text"
                  name="fullName"
                  value={inputs.fullName}
                  placeholder="Full Name"
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
                  value={inputs.password}
                  placeholder="Password"
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
                  value={inputs.password2}
                  placeholder="Repeat password"
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
                  value={inputs.email}
                  placeholder="email adress"
                  onChange={(event) => handleChange(event)}
                />
                {errors.mail ? (
                  <p>
                    <span className="error">{errors.mail}</span>
                  </p>
                ) : null}
              </p>
              <p>
                <label>Number phone </label>
                <input
                  type="text"
                  name="phone"
                  value={inputs.phone}
                  placeholder="Number phone"
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
                  SignUp
                </button>
              </p>
              <div>
                <p>Ya estás registrado?</p>
                <Link to="/">Logueate</Link>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
