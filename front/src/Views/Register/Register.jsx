import React, { useState } from "react";
import { Button, Input } from "../../Component";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left",
    });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
    });
  };

  const handleReg = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:8000/v2/register",
          { name, email, password },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("registered successfully", res);
          handleSuccess(message);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((err) => {
          handleError(message);
          console.log("bad request", err);
        });
    } catch (err) {
      console.log("internl server error", err);
    }
  };

  return (
    <div className="register">
      <div className="left">
        this is the page where you can add your fuckin data
      </div>
      <div className="right">
        <form>
          <Input
            type="text"
            forAttr="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            forAttr="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="text"
            forAttr="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button name="Login" onClick={handleReg} />
        </form>
        <span>
          Allready have an account? <Link to={"/login"}>Login</Link>
        </span>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
