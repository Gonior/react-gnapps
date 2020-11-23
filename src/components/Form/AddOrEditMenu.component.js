import React, { useState, useContext, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import { MyContext } from "../AdminPage/Ctx";
import { getDataCategories } from "../Template/FunctionAPI";

const LabelErorr = ({ text }) => {
  return <small className="text-danger form-text">{text}</small>;
};

const AddOrEditMenu = ({ m }) => {
  const [menu, setMenu] = useState({
    code: m.code || "",
    name: m.name || "",
    category: m.category || "UMUM",
    regulerPrice: m.regulerPrice || "",
    goFoodPrice: m.goFoodPrice || "",
    _id: m._id || ""
  });
  const ctx = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState(false);
  const [menuSuccess, setMenuSuccess] = useState("");

  const [errors, setErrors] = useState({
    code: "",
    name: "",
    category: "Umum",
    regulerPrice: "",
    goFoodPrice: ""
  });

  const handleOnChange = e => {
    const { name, value } = e.target;
    setMenu({
      ...menu,
      [name]: value
    });
  };
  useEffect(() => {
    let isCanceled = false;
    getDataCategories(setCategories, isCanceled);
    return () => {
      isCanceled = true;
    };
  }, [categories]);

  const updateMenu = async () => {
    let token = JSON.parse(localStorage.token);
    let url = "http://localhost:8000/api/admin/menus/update";
    setLoading(true);
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        id: menu._id,
        code: menu.code.toString(),
        name: menu.name,
        category: menu.category,
        regulerPrice: menu.regulerPrice.toString(),
        goFoodPrice: menu.goFoodPrice.toString()
      })
    });

    if (res.status === 200) {
      setErrors({});
      setSuccess(true);
    } else if (res.status === 400) {
      let json = await res.json();
      setErrors({
        code: json.code,
        name: json.name,
        category: json.category,
        regulerPrice: json.regulerPrice,
        goFoodPrice: json.goFoodPrice
      });
    } else {
      console.log(res.statusText);
    }
    setLoading(false);
  };
  const insertMenu = async () => {
    let token = JSON.parse(localStorage.token);
    let url = "http://localhost:8000/api/admin/menus/add";
    setLoading(true);
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        code: menu.code,
        name: menu.name,
        category: menu.category,
        regulerPrice: menu.regulerPrice,
        goFoodPrice: menu.goFoodPrice
      })
    });
    if (res.status === 200) {
      setErrors({});
      setSuccess(true);
      setMenuSuccess(menu.name);
      setMenu({
        code: "",
        name: "",
        category: "UMUM",
        regulerPrice: "",
        goFoodPrice: ""
      });
    } else if (res.status === 400) {
      let json = await res.json();
      setErrors({
        code: json.code,
        name: json.name,
        category: json.category,
        regulerPrice: json.regulerPrice,
        goFoodPrice: json.goFoodPrice
      });
    } else {
      console.log("Unathorized");
    }
    setLoading(false);
  };

  const handleClickSave = () => {
    if (typeof menu._id === "undefined" || menu._id === "") insertMenu();
    else updateMenu();
  };

  return (
    <div className="col">
      {success && (
        <div className="mt-2">
          <Alert
            variant="success"
            onClose={() => setSuccess(false)}
            dismissible
          >
            <p>
              {menuSuccess === ""
                ? "Menu telah diperbaharui"
                : `Menu '${menuSuccess}' berhasil ditambahkan!`}
            </p>
          </Alert>
        </div>
      )}
      <div className="form-group">
        <label className="col-form-label" htmlFor="kodeMenu">
          Kode menu
        </label>
        <input
          className="form-control w-50"
          type="text"
          name="code"
          value={menu.code}
          onChange={handleOnChange}
        />
        {errors.code && <LabelErorr text={errors.code} />}
      </div>
      <div className="form-group">
        <label className="col-form-label" htmlFor="namaMenu">
          Nama menu
        </label>
        <input
          className="form-control"
          type="text"
          name="name"
          value={menu.name}
          onChange={handleOnChange}
        />
        {errors.name && <LabelErorr text={errors.name} />}
      </div>
      <div className="form-group">
        <label className="col-form-label" htmlFor="kategori">
          Kategori
        </label>
        <select
          value={menu.category}
          className="form-control"
          name="category"
          onChange={handleOnChange}
        >
          {categories.map(c => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <div className="col form-group">
          <label className="col-form-label" htmlFor="hargaRegular">
            Harga regular
          </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Rp</span>
            </div>
            <input
              className="form-control"
              type="text"
              name="regulerPrice"
              value={menu.regulerPrice}
              onChange={handleOnChange}
            />
          </div>
          {errors.regulerPrice && <LabelErorr text={errors.regulerPrice} />}
        </div>
        <div className="col form-group">
          <label className="col-form-label" htmlFor="hargaGofood">
            Harga Go-food
          </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Rp</span>
            </div>
            <input
              className="form-control"
              type="text"
              name="goFoodPrice"
              value={menu.goFoodPrice}
              onChange={handleOnChange}
            />
          </div>
          {errors.goFoodPrice && <LabelErorr text={errors.goFoodPrice} />}
        </div>
      </div>
      <div className="form-row">
        <div className="col form-group">
          <button
            type="button"
            className="btn btn-info mr-2"
            onClick={handleClickSave}
          >
            {loading ? (
              <Spinner animation="border" size="sm" variant="light" />
            ) : (
              <span>
                <i className="fa fa-database"></i> Save
              </span>
            )}
          </button>
          <button
            className="btn btn-danger btn-xs"
            onClick={() => {
              if (typeof menu._id === "undefined" || menu._id === "")
                ctx.setOpenPopOver(!ctx.openPopover);
              else ctx.setOpenPopOverEdit(!ctx.openPopoverEdit);
            }}
          >
            <i className="fa fa-times"></i> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOrEditMenu;
