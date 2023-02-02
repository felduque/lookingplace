import { useState, useEffect, useRef } from "react";
import axios from "../Hooks/Axios";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const fullName_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const password_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const email_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phone_REGEX = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
const REGISTER_URL = "/api/user/createUser";

export default function SignUp() {
  const [fullName, setfullName] = useState("");
  const [validName, setValidName] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setvalidPassword] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);

  const [validCaptcha, setValidCaptcha] = useState(false);

  const [avatar, setAvatar] = useState("");
  //const [validAvatar, setValidAvatar] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidName(fullName_REGEX.test(fullName));
  }, [fullName]);

  useEffect(() => {
    setvalidPassword(password_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setValidEmail(email_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPhone(phone_REGEX.test(phone));
  }, [phone]);

  useEffect(() => {
    setErrMsg("");
  }, [fullName, password, matchPassword, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Si el boton es activado con hack
    const v1 = fullName_REGEX.test(fullName);
    const v2 = password_REGEX.test(password);
    const v3 = email_REGEX.test(email);
    const v4 = phone_REGEX.test(phone);
    if (!v1 || !v2 || v3 || v4) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ fullName, password, email, phone }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      setfullName("");
      setPassword("");
      setMatchPassword("");
      setEmail("");
      setPhone("");
      setAvatar("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("email Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  //ReCaptcha
  const captcha = useRef(null);
  console.log('Captcha: ', validCaptcha);
  const onChangeCaptcha = () => {
    if(captcha.current.getValue()) {
      setValidCaptcha(true); 
      console.log('Captcha: ', validCaptcha);
    }
  };

  return (
    <div className="allSignUp">
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="/login">Sign In</Link>
          </p>
        </section>
      ) : (
        <section>
          <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label>
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !fullName ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="fullName"
              autoComplete="off"
              onChange={(e) => setfullName(e.target.value)}
              value={fullName}
              required
            />
            <p
              id="uidnote"
              className={fullName && !validName ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label>
              <FontAwesomeIcon
                icon={faCheck}
                className={validPassword ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPassword || !password ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <p
              id="passNote"
              className={
                password && !validPassword ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />8 to 24 characters. Must
              include uppercase and lowercase letters, a number and a special
              character. Allowed special characters:{"!,#,@,#,$,%"}
            </p>

            <label>
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPassword ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPassword ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setMatchPassword(e.target.value)}
              value={matchPassword}
              required
            />
            <p
              id="confirmnote"
              className={
                matchPassword && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <label>
              <FontAwesomeIcon
                icon={faCheck}
                className={validPhone ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? "hide" : "invalid"}
              />
            </label>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <p
              id="email"
              className={email && !validEmail ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Email Incorrect
            </p>
            


        



            { /*
            <label>Avatar: </label>
            <input
              type="file" //Checkear, no estoy seguro
              placeholder="Avatar"
              onChange={(e) => setAvatar(e.target.value)}
              value={avatar}
            /> */ }
            <p>
            <ReCAPTCHA
                 ref={captcha}
                 sitekey="6Le2F0EkAAAAAPCok1gCfpggSPFK8oKRBI5GDSAE"
                 onChange={onChangeCaptcha}
            />
            </p>
            <button
              disabled={
                !fullName || !password || !matchPassword || !email || !validEmail || !validCaptcha ? true : false
              }
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              <Link to="/login">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
}
