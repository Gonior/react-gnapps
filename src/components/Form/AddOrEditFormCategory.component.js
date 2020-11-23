import React, { useState } from "react";
import { Spinner } from "react-bootstrap";

const AddOrEditFormCategory = ({ c, cb }) => {
  const [category, setCategory] = useState({
    name: c.name || "",
    id: c._id || ""
  });
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    success: false,
    name: ""
  });
  const myCb = () => {
    cb();
    setTimeout(function() {
      setSuccess({
        success: false,
        name: ""
      });
    }, 300);
  };

  const handleChangeName = e => {
    setCategory({ name: e.target.value, id: c._id });
  };

  const addOrUpdateCategory = async () => {
    setLoading(true);
    let token = JSON.parse(localStorage.token);
    let body;
    let url = "http://localhost:8000/api/admin/categories/";
    if (typeof category.id === "undefined") {
      url += "/add";
      body = JSON.stringify({
        name: category.name
      });
    } else {
      url += "/update";
      body = JSON.stringify({
        name: category.name,
        id: category.id
      });
    }
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token
      },
      body: body
    });

    if (res.ok) {
      let json = await res.json();
      setSuccess({
        success: true,
        name: json.name
      });
      if (typeof category.id === "undefined" || category.id === "") {
        setCategory({
          name: "",
          id: ""
        });
      }
      setErrors("");
    } else {
      let json = await res.json();
      setErrors(json.name);
      setSuccess({
        success: false,
        name: ""
      });
    }
    setLoading(false);
  };

  const handleClick = e => {
    addOrUpdateCategory();
  };

  return (
    <div className="form mt-2">
      <div className="form-group w-100">
        <label>Name of category</label>
        <input
          type="text"
          className="form-control mr-2 w-100"
          value={category.name}
          placeholder="Enter your category name here.."
          onChange={handleChangeName}
        />
        {errors && <small className="text-danger">{errors}</small>}
        {success.success && (
          <small className="text-success">
            Category {success.name} has been{" "}
            {typeof category.id === "undefined" || category.id === ""
              ? "added"
              : "updated"}
          </small>
        )}
      </div>
      <button
        type="button"
        disabled={loading}
        className="btn btn-primary mr-1"
        onClick={handleClick}
      >
        {loading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <span>
            <i className="fa fa-database"></i> Save
          </span>
        )}
      </button>
      <button type="button" className="btn btn-danger mr-1" onClick={myCb}>
        <span>
          <i className="fa fa-times"></i> Close
        </span>
      </button>
    </div>
  );
};

export default AddOrEditFormCategory;
