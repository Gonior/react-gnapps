import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

const ErrorPin = ({ text }) => {
  return (
    <div
      className="alert alert-danger fade show text-center"
      style={{ marginTop: "-22%" }}
      role="alert"
    >
      <p>{text}</p>
    </div>
  );
};
const auth = history => {
  if (typeof localStorage.token !== "undefined") {
    if (JSON.parse(localStorage.user).loginTo === "admin") {
      return history.push("/admin");
    } else return history.push("/kasir");
  }
};
const CardLogin = ({ bgColor, icon, loginTo }) => {
  const [pin, setPin] = useState("");
  const [errors, setErrors] = useState(false);
  const [msgError, setMsgError] = useState("");
  const history = useHistory();
  // useEffect(() => {
  // 	let isCanceled = false
  //
  //
  //
  // }, [history]);

  auth(history);

  const login = async (admin, pin) => {
    let url = "http://localhost:8000/api/auth/";
    let success = false;
    let message = "";
    if (admin) {
      url += "/loginAdmin";
    } else url += "/login";

    try {
      let res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ pin: pin })
      });
      if (res.status === 200) {
        let json = await res.json();
        success = true;
        let token = json.token.replace("Bearer ", "");
        const user = jwtDecode(token);
        user.loginTo = "admin";
        localStorage.setItem("token", JSON.stringify(json.token));
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        let json = await res.json();
        message = json.pin;
      }
    } catch (e) {
      message = "Server tidak merespon. Silakan hidupkan server";
    }

    if (!success) {
      setErrors(!success);
      setMsgError(message);
    } else {
      if (admin) history.push("/admin");
      else history.push("/kasir");
    }
  };
  const handleChange = e => {
    setPin(e.target.value);
  };
  const handleClick = () => {
    if (pin.trim() === "") {
      setMsgError("PIN is required");
      setErrors(true);
    } else {
      if (loginTo === "loginAdmin") login(true, pin);
      else login(false, pin);
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="container d-flex h-100">
        <div className="row justify-content-center align-self-center mx-auto">
          <div className="col">
            {errors && <ErrorPin text={msgError} />}

            <div className={"p-4 text-white bg-" + bgColor}>
              <p className="text-left mb-0">
                <a href="/">
                  <i className="fa fa-arrow-circle-left fa-3x text-white" />
                </a>
              </p>
              <h1 className="text-center mb-4">
                <i className={"fa-3x " + icon} />
              </h1>
              <div className="input-group mb-3 input-group-lg">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-light">
                    <i className={"fa fa-key text-" + bgColor} />
                  </span>
                </div>
                <input
                  className="form-control"
                  type="password"
                  name="pin"
                  placeholder="PIN"
                  value={pin}
                  onChange={handleChange}
                  requaired="requaired"
                />
              </div>
              <button
                className="btn btn-outline-light w-100 btn-lg"
                id="btnAdmin"
                onClick={handleClick}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardLogin;
