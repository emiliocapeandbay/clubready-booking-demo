import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Tabs";
import NotFound from "./pages/NotFound";

export default (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
