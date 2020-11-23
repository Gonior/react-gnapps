import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import CardLanding from "../CardComponent/CardLandingPage.Component";
import CardLogin from "../loginPage/loginPage.component";
import Admin from "../AdminPage/Admin";
const loginProps = [
  {
    color: "danger",
    icon: "fa fa-cogs",
    title: "Admin",
    labelText: "Atur menu, harga dan lainnya di halaman ini",
    linkTo: "loginAdmin"
  },
  {
    color: "info",
    icon: "fa fa-calculator",
    title: "Kasir",
    labelText: "Urusan hitung-menghitung ada di halaman ini",
    linkTo: "loginKasir"
  }
];
const Home = () => {
  return (
    <div style={{ height: "100vh" }}>
      <div className="container d-flex h-100">
        <div className="row justify-content-center align-self-center mx-auto">
          {loginProps.map((p, index) => (
            <CardLanding com={p} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Kasir = () => {
  const history = useHistory();
  return (
    <div className="container">
      <h1 className="display-5">Wellcome to kasir page</h1>
      <button
        className="btn btn-danger"
        onClick={() => {
          history.push("/loginKasir");
        }}
      >
        Keluar
      </button>
    </div>
  );
};
const LoginKasir = () => {
  return (
    <CardLogin
      bgColor={loginProps[1].color}
      icon={loginProps[1].icon}
      loginTo={loginProps[1].linkTo}
    />
  );
};
const LoginAdmin = () => {
  return (
    <CardLogin
      bgColor={loginProps[0].color}
      icon={loginProps[0].icon}
      loginTo={loginProps[0].linkTo}
    />
  );
};
const Login = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/loginAdmin" component={LoginAdmin} />
        <Route path="/loginKasir" component={LoginKasir} />
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/kasir">
          <Kasir />
        </Route>
      </Switch>
    </Router>
  );
};

export default Login;
