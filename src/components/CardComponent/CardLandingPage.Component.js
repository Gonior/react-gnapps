import React from "react";
import { Link } from "react-router-dom";

const CardLogin = (com) => {
  return (
    <div className="col-sm-6 col-md-5" style={{ marginBottom: 30 }}>
      <div className={"card text-white bg-" + com.com.color}>
        <i
          className={"fa fa-5x text-center " + com.com.icon}
          style={{ marginTop: 20 }}
        />
        <div className="card-body">
          <h4 className="card-title text-center">{com.com.title}</h4>
          <p className="card-text">{com.com.labelText}</p>
          <Link
            className="btn w-100 btn-outline-light"
            to={"/" + com.com.linkTo}
          >
            Telusuri
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardLogin;
