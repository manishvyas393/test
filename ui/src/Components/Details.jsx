import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Details = ({ user }) => {
  const navigate = useNavigate();
  const logoutHandle = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/users/logout");
    if (data.success) {
      navigate("/");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p>Name: {user?.name}</p>
      <p>email: {user?.email}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to={"/edit/profile"}>
          <button>Edit Profile</button>
        </Link>
        <button onClick={logoutHandle}>Logout</button>
      </div>
    </div>
  );
};

export default Details;
