import React, { useState, useEffect, useRef } from "react";
import { Popover, Overlay, Spinner } from "react-bootstrap";
import { MyContext } from "../AdminPage/Ctx";
import AddOrEditMenu from "../Form/AddOrEditMenu.component";
import IsEmptyContent from "../Template/IsEmptyTemplate.component";
import { getDataMenus as getData } from "../Template/FunctionAPI";

const IsiTableContent = ({ menu }) => {
  const [openPopover, setOpenPopOver] = useState(false);
  const [openPopoverEdit, setOpenPopOverEdit] = useState(false);
  const [target, setTarget] = useState(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  let { code, name, regulerPrice, goFoodPrice, category, _id } = menu;

  const deleteMenu = async id => {
    setLoading(!loading);
    let url = `http://localhost:8000/api/admin/menus/delete/${id}`;
    let res = await fetch(url, {
      method: "POSt",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.token)
      }
    });
    if (res.status === 200) {
      setOpenPopOver(!openPopover);
    }
    setLoading(!loading);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{code}</td>
      <td>
        Rp <span>{regulerPrice}</span>
      </td>
      <td>
        Rp
        <span>{goFoodPrice}</span>
      </td>
      <td>{category}</td>
      <td>
        <button
          className="btn btn-info btn-sm"
          style={{ borderRadius: 5 }}
          onClick={e => {
            setOpenPopOverEdit(!openPopoverEdit);
            setTarget(e.target);
          }}
        >
          <i className="fa fa-edit" />
        </button>
        <button
          className="btn btn-danger btn-sm ml-2"
          onClick={e => {
            setOpenPopOver(!openPopover);
            setTarget(e.target);
          }}
          style={{ borderRadius: 5 }}
        >
          <i className="fa fa-trash text-white" />
        </button>
      </td>
      <Overlay
        placement="bottom"
        show={openPopover}
        target={target}
        closeRoot={true}
        container={ref.current}
      >
        <Popover id="popover-delete">
          <Popover.Title as="h3">Delete item</Popover.Title>
          <Popover.Content>
            <>
              <div className="text-center">
                <p>Are you sure delete this item?</p>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-danger mr-2"
                  onClick={() => {
                    setOpenPopOver(!openPopover);
                  }}
                >
                  No
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => deleteMenu(_id)}
                >
                  {loading ? (
                    <Spinner animation="border" variant="light" size="sm" />
                  ) : (
                    "YES"
                  )}
                </button>
              </div>
            </>
          </Popover.Content>
        </Popover>
      </Overlay>
      <Overlay
        placement="left"
        show={openPopoverEdit}
        target={target}
        container={ref.current}
      >
        <Popover id="popover-editMenu" style={{ maxWidth: "600px" }}>
          <MyContext.Provider value={{ openPopoverEdit, setOpenPopOverEdit }}>
            <Popover.Content>
              <AddOrEditMenu m={menu} />
            </Popover.Content>
          </MyContext.Provider>
        </Popover>
      </Overlay>
    </tr>
  );
};

const TableContent = () => {
  const [MENU, setMENU] = useState([]);

  useEffect(() => {
    let isCanceled = false;
    try {
      if (!isCanceled) {
        getData(setMENU, isCanceled);
      }
    } catch (e) {
      console.log(e);
    }
    return () => {
      isCanceled = true;
    };
  }, [MENU]);
  return (
    <div className="card mb-4 w-100">
      <div className="card-header">
        <i className="fa fa-table mr-1" />
        Daftar Menu
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover " width="100%" cellSpacing={0}>
            <thead className="thead-dark">
              <tr>
                <th>Nama Menu</th>
                <th>Kode Menu</th>
                <th>Harga Reguler</th>
                <th>Harga Go-Food</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {MENU.length === 0 ? (
                <IsEmptyContent colspan={6} />
              ) : (
                MENU.map(m => <IsiTableContent menu={m} key={m._id} />)
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MenuPage = () => {
  const [openPopover, setOpenPopOver] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  return (
    <div className="container-fluid">
      <h1>Menu Page</h1>
      <hr></hr>
      <div className="row mt-2">
        <div className="col-md-2">
          <button
            className="btn btn-info"
            onClick={e => {
              setOpenPopOver(!openPopover);
              setTarget(e.target);
            }}
          >
            <i className="fa fa-plus"></i>
            <span> Tambah Menu</span>
          </button>
          <Overlay
            placement="right"
            show={openPopover}
            target={target}
            container={ref.current}
          >
            <Popover id="popover-basic" style={{ maxWidth: "600px" }}>
              <MyContext.Provider value={{ openPopover, setOpenPopOver }}>
                <Popover.Title as="h3"></Popover.Title>
                <Popover.Content>
                  <AddOrEditMenu m={{}} />
                </Popover.Content>
              </MyContext.Provider>
            </Popover>
          </Overlay>
        </div>

        <div className="col-md-5 pl-0">
          <div className="input-group">
            <input
              className="form-control"
              id="input-cari"
              type="text"
              placeholder="Cari menu.."
            />
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <TableContent />
      </div>
    </div>
  );
};

export default MenuPage;
