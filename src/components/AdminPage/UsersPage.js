import React from "react";

const UsersPage = () => {
  return (
    <div className="container-fluid">
      <h1>Menu Page</h1>
      <hr></hr>
      <div className="row mt-2">
        <div className="col-md-2">
          <button
            className="btn btn-info"
            onClick={e => {
              alert("open it");
            }}
          >
            <i className="fa fa-plus"></i>
            <span> Add new user</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
