import React, { useState } from "react";
import { Button, Input } from "../../Component";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleErr = (err) => {
    toast.error(err, {
      position: "bottom-left",
    });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:8000/v2/login",
          { email, password },
          { withCredentials: true }
        )
        .then((message) => {
          handleSuccess(message);
          setTimeout(() => {
            navigate("/admin");
          }, 2000);
          // const token = resp.data.token;
          // localStorage.setItem("token", token);
          // console.log("user logged in");
          // window.location.href = "/admin";
        })
        .catch((message) => {
          handleErr(message);
        });
    } catch (err) {
      console.log("login error", err);
    }
  };
  return (
    <div>
      <div className="left">this is fuckin login page</div>
      <div className="right">
        <form>
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

          <Button name="Login" onClick={handleLogin} />
        </form>
        <span>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
