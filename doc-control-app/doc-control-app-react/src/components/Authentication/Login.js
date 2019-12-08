import React from "react";

const Login = ({
  username,
  password,
  onUsernameChange,
  onPassChange,
  onSubmit,
  error
}) => {
  let wrongData = () => {
    if (error)
      if (error.includes("Bad"))
        return (
          <h6 className="wrong-pass-or-username text-danger">
            Neteisingai įvedėte vartotojo vardą arba slaptažodį
          </h6>
        );
      else {
        return <h6 className="wrong-pass-or-username text-danger">{error}</h6>;
      }
    else {
      return <div />;
    }
  };
  return (
    <React.Fragment>
      <div className="page-holder d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-lg-7 col-md-6 col-sm-6 mx-auto my-4 my-lg-0">
              <div className="pr-lg-5">
                <img src={"/image/logo2.svg"} alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-5 px-lg-3 mt-5">
              <h1 className="text-base blue text-uppercase mb-4">
                Dokumentų Valdymo Sistema v 1.0.0
              </h1>
              <h2 className="mb-4">Sveiki sugrįžę!</h2>
              {wrongData()}
              <form id="loginForm" className="mt-4" onSubmit={e => onSubmit(e)}>
                <div className="form-group mb-4">
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={onUsernameChange}
                    required="required"
                    placeholder="Vartotojo vardas"
                    className="form-control border-3 shadow"
                    title="Įveskite vartotojo vardą."
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="password"
                    value={password}
                    onChange={onPassChange}
                    placeholder="Slaptažodis"
                    required="required"
                    className="form-control border-3 shadow "
                    title="Įveskite vartotojo slaptažodį."
                  />
                </div>
                <div className="form-group mb-4" />
                <button
                  type="submit"
                  className="btn submitButton shadow px-5 mt-2"
                >
                  Prisijungti.
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Login;
