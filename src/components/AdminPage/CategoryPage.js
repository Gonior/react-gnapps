import React, { useState, useEffect, useRef } from "react";
import { Collapse, Spinner, Popover, Overlay } from "react-bootstrap";
import IsEmptyContent from "../Template/IsEmptyTemplate.component";
import AddOrEditFormCategory from "../Form/AddOrEditFormCategory.component";
import { getDataCategories as getData } from "../Template/FunctionAPI";

const CategoryPage = () => {
  const [openForm, setOpenForm] = useState(false);
  const openClose = () => {
    setTimeout(function() {
      setOpenForm(!openForm);
    }, 300);
  };
  return (
    <div className="container-fluid">
      <h1>Category Page</h1>
      <hr></hr>
      <div className="row mt-2">
        <div className="col">
          <button
            className="btn btn-info"
            onClick={e => {
              setOpenForm(!openForm);
            }}
          >
            <i className="fa fa-plus"></i>
            <span> Add New Category</span>
          </button>
          <Collapse in={openForm}>
            <div>
              <AddOrEditFormCategory c={{}} cb={openClose} />
            </div>
          </Collapse>
        </div>
      </div>
      <div className="row mt-4">
        <TableContent />
      </div>
    </div>
  );
};

const IsiTableContent = ({ category }) => {
  let { name, _id } = category;
  const [target, setTarget] = useState(null);
  const [openPopover, setOpenPopOver] = useState(false);
  const [openPopoverEdit, setOpenPopOverEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState({
    message: "",
    isFailed: false
  });
  const ref = useRef(null);

  const closeOpen = () => {
    setTimeout(function() {
      setOpenPopOverEdit(!openPopoverEdit);
    }, 300);
  };
  const deleteCategory = async id => {
    setLoading(true);
    let url = `http://localhost:8000/api/admin/categories/delete/${id}`;

    let res = await fetch(url, {
      method: "POSt",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.token)
      }
    });

    if (res.status === 200) {
      setOpenPopOver(!openPopover);
    } else {
      let json = await res.json();
      setFailed({
        message: json.category,
        isFailed: true
      });
      setLoading(false);
    }
    setLoading(false);
  };
  useEffect(() => {}, [loading]);
  let isDisable = false;
  if (name === "UMUM") isDisable = true;

  return (
    <tr>
      <td>{name}</td>
      <td>
        <button
          className="btn btn-info btn-sm"
          style={{ borderRadius: 5 }}
          disabled={isDisable}
          onClick={e => {
            setOpenPopOverEdit(!openPopoverEdit);
            setTarget(e.target);
          }}
        >
          <i className="fa fa-edit" />
        </button>
        <button
          className="btn btn-danger btn-sm ml-2"
          disabled={isDisable}
          onClick={e => {
            setOpenPopOver(!openPopover);
            setTarget(e.target);
          }}
          style={{ borderRadius: 5 }}
        >
          <i className="fa fa-trash text-white" />
        </button>
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
              {failed.isFailed ? (
                <small className="text-danger">{failed.message}</small>
              ) : (
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
                      disabled={loading}
                      onClick={() => deleteCategory(_id)}
                    >
                      YES
                      {loading && (
                        <Spinner animation="border" variant="light" size="sm" />
                      )}
                    </button>
                  </div>
                </>
              )}
            </Popover.Content>
          </Popover>
        </Overlay>
        <Overlay
          placement="top"
          show={openPopoverEdit}
          target={target}
          container={ref.current}
        >
          <Popover
            id="popover-edit"
            style={{ maxWidth: "600px", width: "400px" }}
          >
            <Popover.Content>
              <AddOrEditFormCategory c={category} cb={closeOpen} />
            </Popover.Content>
          </Popover>
        </Overlay>
      </td>
    </tr>
  );
};
const TableContent = () => {
  const [categories, setCategories] = useState([]);
  const currentLength = categories.length;
  useEffect(() => {
    let isCanceled = false;
    try {
      if (!isCanceled) {
        getData(setCategories, isCanceled);
      } else {
        console.log("not doing get data");
      }
    } catch (e) {
      console.log(e);
    }
    return () => {
      isCanceled = true;
    };
  }, [categories]);

  useEffect(() => {
    return () => {
      getData(setCategories, true);
    };
  }, []);

  return (
    <div className="card mb-4 w-100">
      <div className="card-header">
        <i className="fa fa-table mr-1" />
        List of Category
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover " width="100%" cellSpacing={0}>
            <thead className="thead-dark">
              <tr>
                <th>Name of Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length <= 0 ? (
                <IsEmptyContent colspan="2" />
              ) : (
                categories.map(c => (
                  <IsiTableContent category={c} key={c._id} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default CategoryPage;
