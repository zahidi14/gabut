import React from "react";
import { Routes, Route } from "react-router-dom";
import { Admin, Login, Main, NotFound, Register } from "../../Views";
import PrivRoute from "../PrivRoute/PrivRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
