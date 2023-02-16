import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const EditProfile = ({ user }) => {
  const [email, setEmail] = useState(user?.email);
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password === "") {
      const { data } = await axios.patch("/api/users/me", {
        email,
        name,
      });
      if (data.success) {
        navigate("/profile");
      }
    } else {
      const { data } = await axios.patch("/api/users/me", {
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
          <h1>Edit</h1>
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
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
