import React, { useState, useEffect } from "react";
import {
  Link,
  useHistory,
  useParams,
  useRouteMatch,
  Route,
  Switch
} from "react-router-dom";
import { Collapse } from "react-bootstrap";
import MenuPage from "../AdminPage/MenuPage";
import CategoryPage from "../AdminPage/CategoryPage";
import UserPage from "../AdminPage/UsersPage";
import { getDataCategories, getDataMenus } from "../Template/FunctionAPI";
import IsEmptyContent from "../Template/IsEmptyTemplate.component";

const SideNav = () => {
  let { url } = useRouteMatch();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    role: "",
    loginTo: "admin"
  });
  const history = useHistory();
  useEffect(() => {
    let cancel = false;
    if (!cancel) {
      let u = JSON.parse(localStorage.user);
      setUser({ ...u });
    }
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading">Main menu</div>
          <Link className="nav-link" to="/admin">
            <div className="sb-nav-link-icon">
              <i className="fa fa-tachometer" />
            </div>
            Halaman Utama
          </Link>
          <span
            className="nav-link collapse"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="collapseLayouts"
          >
            <div className="sb-nav-link-icon">
              <i className="fa fa-columns" />
            </div>
            Menu
            <div className="sb-sidenav-collapse-arrow">
              <i className="fa fa-angle-down" />
            </div>
          </span>
          <Collapse in={open}>
            <div id="collapseLayouts">
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to={`${url}/menu`}>
                  Menu
                </Link>
                <Link className="nav-link" to={`${url}/category`}>
                  Category Menu
                </Link>
              </nav>
            </div>
          </Collapse>
          <Link className="nav-link" to="/admin/user">
            <div className="sb-nav-link-icon">
              <i className="fa fa-user fa-fw" />
            </div>
            User
          </Link>
          <Link className="nav-link" to="/admin/lalala">
            <div className="sb-nav-link-icon">
              <i className="fa fa-cogs" />
            </div>
            Tentang Rumah Makan
          </Link>
        </div>
      </div>
      <div className="sb-sidenav-footer">
        <div className="small">Masuk sebagai:</div>
        {user.name}
        <div>
          <button
            className="btn btn-danger btn-xm w-100"
            onClick={() => {
              history.push("/loginAdmin");
              localStorage.clear();
            }}
          >
            Keluar <i className="fa fa-sign-out"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

const CardHalUtama = ({ title, dataCount, ke, warna }) => {
  return (
    <div className="col-xl-4 col-md-12">
      <div className={"card text-white mb-4 " + warna}>
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <div className="d-flex align-items-center justify-content-between small">
            <h5 className="card-text">{`Jumlah ${title} : `}</h5>
            <h5 className="font-weight-bold">{dataCount}</h5>
          </div>
        </div>
        <div className="card-footer d-flex align-items-center justify-content-between">
          <Link className="small text-white stretched-link" to={ke}>
            Lihat
          </Link>
          <div className="small text-white">
            <i className="fa fa-angle-right" />
          </div>
        </div>
      </div>
    </div>
  );
};

const RowTable = ({ value }) => {
  return (
    <tr>
      <td>{value.name}</td>
      <td>{value.code}</td>
      <td>{value.regulerPrice}</td>
      <td>{value.goFoodPrice}</td>
      <td>{value.category}</td>
    </tr>
  );
};
const TableContent = ({ menus }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <i className="fa fa-table mr-1" />
        Menu
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table
            className="table table-bordered"
            id="dataTable"
            width="100%"
            cellSpacing={0}
          >
            <thead>
              <tr>
                <th>Nama Menu</th>
                <th>Kode Menu</th>
                <th>Harga Reguler</th>
                <th>Harga Go-Food</th>
                <th>Category</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan="5">
                  <p className=" text-center">
                    <Link className="btn btn-outline-dark" to="#">
                      Lihat selengkapnya..
                    </Link>
                  </p>
                </td>
              </tr>
            </tfoot>
            <tbody>
              {menus.length <= 0 ? (
                <IsEmptyContent colspan="5" />
              ) : (
                menus.map(menu => <RowTable key={menu._id} value={menu} />)
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const FooterContent = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-between small">
        <div className="text-muted">
          Powered by SB-admin-bootstrap &amp; React-js
        </div>
        <div>
          <span className="text-muted">Develop by </span>
          <Link to="#" className="text-black">
            Gonior
          </Link>
        </div>
      </div>
    </div>
  );
};
function ContentPage() {
  let { parameter } = useParams();
  switch (parameter) {
    case "menu":
      return <MenuPage />;
    case "category":
      return <CategoryPage />;
    case "user":
      return <UserPage />;
    default:
      return (
        <div className="text-center">
          <h2 className="display-4">404</h2>
          <p className="text">not found</p>
        </div>
      );
  }
}

const HalamanUtama = () => {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isCanceled = false;
    getDataMenus(setMenus, isCanceled);
    getDataCategories(setCategories, isCanceled);
    return () => {
      isCanceled = true;
    };
  }, []);
  return (
    <div className="container-fluid">
      <h1 className="mt-4">Selamat datang di halaman utama </h1>
      <h4 className="small text-muted">
        Anda bisa melalukan penambahan menu dsb. di halaman ini
      </h4>
      <hr></hr>
      <div className="row mt-2">
        <CardHalUtama
          title="Menu"
          dataCount={menus.length}
          ke="#"
          warna="bg-primary"
        />
        <CardHalUtama title="User" dataCount={0} ke="#" warna="bg-info" />
        <CardHalUtama
          title="Category Menu"
          dataCount={categories.length}
          ke="#"
          warna="bg-danger"
        />
      </div>
      <TableContent menus={menus} />
    </div>
  );
};
const auth = history => {
  if (typeof localStorage.token === "undefined") {
    return history.push("/loginAdmin");
  }
};
const Admin = () => {
  let { path } = useRouteMatch();
  let history = useHistory();
  try {
    auth(history);
  } catch (e) {}

  const [toggleSideBar, setToggleSideBar] = useState(false);
  return (
    <div className={toggleSideBar ? "sb-sidenav-toggled" : "sb-nav-fixed"}>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-brand">
          gnApps <i className="fa fa-code text-info"></i>
        </div>
        <button
          className="btn btn-link btn-sm order-1 order-lg-0"
          id="sidebarToggle"
          onClick={() => {
            setToggleSideBar(!toggleSideBar);
          }}
        >
          <i className="fa fa-bars" />
        </button>
        <div className="d-none d-md-inline-block ml-auto mr-0 mr-md-3 my-2 my-md-0">
          <span className="nav-item text-white">
            <i className="fa fa-calendar"></i> 14-12-2020
          </span>
          <span> </span>
          <span className="nav-item text-white">
            <i className="fa fa-clock-o"></i> 00.12
          </span>
        </div>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <SideNav />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <Switch>
              <Route path={path} exact>
                <HalamanUtama />
              </Route>
              <Route path={`${path}/:parameter`}>
                <ContentPage />
              </Route>
            </Switch>
          </main>
          <footer className="py-4 bg-light mt-auto">
            <FooterContent />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Admin;
