import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const RegisterAuth = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const changeHandler = (event) => {
    setForm((prevstate) => {
      return {
        ...prevstate,
        [event.target.name]: event.target.value,
      };
    });
  };
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const json = {
        name: form.name,
        email: form.email,
        password: form.password,
      };
      const response = await axios.post(
        "https://food-truck-api.onrender.com/api/v1/user/register",
        json
      );
      console.log(response.data);
      if (response.data.success) {
        toast(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      if (!error.response.data.success) {
        toast(error.response.data.message);
      }
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={changeHandler}
            value={form.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={changeHandler}
            value={form.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={changeHandler}
            value={form.password}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>
        already have an account{" "}
        <Link to={"/login"}>
          <span>click here</span>
        </Link>
      </p>
    </div>
  );
};

export default RegisterAuth;
