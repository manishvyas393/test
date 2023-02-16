import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (email === "" || name === "" || password === "") {
      alert("please fill all fields");
    } else {
      const { data } = await axios.post("/new/user", {
        email,
        name,
        password,
      });
      if (data.success) {
        navigate("/profile");
      }
    }
  };
  return (
    <div>
      <div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          onSubmit={onSubmitHandler}
        >
          <h1>Register User</h1>
          <input
            type={"email"}
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type={"text"}
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type={"password"}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button>Submit</button>
          <Link to={"/login"}>
            <button>already registered</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
