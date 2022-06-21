import React from "react";

import "./UserContainer.css";

const UserContainer = ({ users }) => (
  <div className="textContainer">
    {users ? (
      <div className="user-container">
        <h3>Online Users</h3>
        <div className="activeContainer">
          {users.map(({ name }) => (
            <div key={name} className="activeItem">
              {name}
              {/* <img alt="Online Icon" src={onlineIcon}/> */}
              online
            </div>
          ))}
        </div>
      </div>
    ) : null}
  </div>
);

export default UserContainer;
