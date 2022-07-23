import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    window.location.href = `/shop/name/${name}`;
  };
  return (
    <form className="flex search" onSubmit={submitHandler}>
      <input
        type="text"
        name="q"
        id="q"
        placeholder={"Search Poster"}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <button className="primary" type="submit">
        <i className="fa fa-search"></i>
      </button>
    </form>
  );
}
