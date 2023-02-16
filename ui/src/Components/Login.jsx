import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/login", {
        email,
        password,
      });
      if (data?.user) {
        navigate("/profile");
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  return (
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
        <h1>Login</h1>
        {error ? <p>{error}</p> : ""}
        <input
          type={"email"}
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type={"password"}
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
