import axios from "axios";
import React, { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "../../Component";

const Admin = () => {
  const navigate = useNavigate();
  const [cookie, removeCookie] = useCookies([]);
  const [username, setUser] = useState("");

  useEffect(() => {
    const verifCookie = async () => {
      if (!cookie.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:8000/v2/admin",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUser(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifCookie();
  }, [cookie, navigate, removeCookie]);

  const logout = () => {
    removeCookie("token");
    navigate("/register");
  };
  return (
    <div>
      this is a fuckin admin shit that name is {username}{" "}
      <Button name="logout" onClick={logout} /> <ToastContainer />
    </div>
  );
};

export default Admin;
