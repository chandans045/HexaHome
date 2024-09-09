import React, { useState } from "react";
import axios from "axios";
//hello h
const Navbar = ({ onSearchChange, filteredAreas = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [signupFormData, setSignupFormData] = useState({
    fullname: "",
    dob: "",
    number: "",
    email: "",
    password: "",
  });
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearchChange(term);
    setShowDropdown(term.length > 0 && filteredAreas.length > 0);
  };

  const handleAreaClick = (area) => {
    setSearchTerm(area);
    onSearchChange(area);
    setShowDropdown(false);
  };

  const validateSignupForm = () => {
    const errors = {};
    if (!signupFormData.fullname) errors.fullname = "Full name is required";
    if (!signupFormData.dob) errors.dob = "Date of birth is required";
    if (!/^\d{10}$/.test(signupFormData.number))
      errors.number = "Phone number must be 10 digits";
    if (!/\S+@\S+\.\S+/.test(signupFormData.email))
      errors.email = "Email is invalid";
    if (
      !/(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(
        signupFormData.password
      )
    )
      errors.password =
        "Password must contain at least 8 characters, one uppercase letter, one number, and one special character";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignupForm()) return;

    try {
      const response = await axios.post(
        "https://hexahome-backend-1.onrender.com/api/signup",
        signupFormData
      );
      alert("Signup successful!");
      setLoggedInUser({ fullname: signupFormData.fullname });
      setShowSignupModal(false);
      setSignupFormData({
        fullname: "",
        dob: "",
        number: "",
        email: "",
        password: "",
      });
    } catch (error) {
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        console.error(
          "AxiosError:",
          error.response ? error.response.data : error.message
        );
        alert("Error during signup");
      }
    }
  };

  const validateLoginForm = () => {
    const errors = {};
    if (!/\S+@\S+\.\S+/.test(loginFormData.email))
      errors.email = "Email is invalid";
    if (
      !/(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(
        loginFormData.password
      )
    )
      errors.password =
        "Password must contain at least 8 characters, one uppercase letter, one number, and one special character";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    try {
      const response = await fetch(
        "https://hexahome-backend-1.onrender.com/api/users"
      );

      if (response.ok) {
        const userData = await response.json();
        const user = userData.find(
          (user) =>
            user.email === loginFormData.email &&
            user.password === loginFormData.password
        );

        if (user) {
          alert("Login successful!");
          setLoggedInUser({ fullname: user.fullname });
          setLoginFormData({
            email: "",
            password: "",
          });
          setShowLoginModal(false);
        } else {
          alert("Invalid credentials");
        }
      } else {
        alert("Error fetching user data");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error during login");
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="./images/hexalogo.png" alt="HexaHome Logo" height="30" />
            <b style={{ color: "#048acc" }}> HexaHome</b>
          </a>

          <div className="d-flex align-items-center me-2 pt-2 pb-2">
            <div className="d-flex flex-grow-1 position-relative">
              <input
                className="form-control btn-outline-secondary"
                type="search"
                placeholder='Search for "Locality or Landmark"'
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                  paddingRight: "150px",
                  width: "500px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              />
              <div className="position-absolute top-0 end-0 me-2">
                <button
                  className="btn btn-secondary mt-1 shadow-none"
                  type="submit"
                  style={{ zIndex: 1 }}
                  onClick={() => handleAreaClick(searchTerm)}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {showDropdown && filteredAreas.length > 0 && (
            <div
              className="dropdown-menu show"
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                width: "100%",
                maxHeight: "200px",
                zIndex: "1000",
                overflowY: "auto",
              }}
            >
              {filteredAreas.map((area, index) => (
                <a
                  key={index}
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleAreaClick(area)}
                >
                  {area}
                </a>
              ))}
            </div>
          )}

          <div className="d-flex align-items-center">
            <button className="btn btn-success me-2 rounded-pill">
              Post Property{" "}
              <span className="badge bg-light text-success">FREE</span>
            </button>

            {loggedInUser ? (
              <div className="dropdown me-2">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {loggedInUser.fullname}
                </button>
                <ul className="dropdown-menu" aria-labelledby="userDropdown">
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="dropdown me-2">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  id="loginDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Login
                </button>
                <ul className="dropdown-menu" aria-labelledby="loginDropdown">
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => setShowLoginModal(true)}
                    >
                      Login
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => setShowSignupModal(true)}
                    >
                      Register
                    </a>
                  </li>
                </ul>
              </div>
            )}

            <button className="btn btn-light">☰</button>
          </div>
        </div>
      </nav>

      {/* Signup Modal */}
      {showSignupModal && (
        <div
          className="modal show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sign Up</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowSignupModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSignupSubmit}>
                  <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.fullname ? "is-invalid" : ""
                      }`}
                      id="fullname"
                      name="fullname"
                      value={signupFormData.fullname}
                      onChange={handleSignupInputChange}
                    />
                    {formErrors.fullname && (
                      <div className="invalid-feedback">
                        {formErrors.fullname}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dob" className="form-label">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className={`form-control ${
                        formErrors.dob ? "is-invalid" : ""
                      }`}
                      id="dob"
                      name="dob"
                      value={signupFormData.dob}
                      onChange={handleSignupInputChange}
                    />
                    {formErrors.dob && (
                      <div className="invalid-feedback">{formErrors.dob}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="number" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.number ? "is-invalid" : ""
                      }`}
                      id="number"
                      name="number"
                      value={signupFormData.number}
                      onChange={handleSignupInputChange}
                    />
                    {formErrors.number && (
                      <div className="invalid-feedback">
                        {formErrors.number}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        formErrors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      name="email"
                      value={signupFormData.email}
                      onChange={handleSignupInputChange}
                    />
                    {formErrors.email && (
                      <div className="invalid-feedback">{formErrors.email}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        formErrors.password ? "is-invalid" : ""
                      }`}
                      id="password"
                      name="password"
                      value={signupFormData.password}
                      onChange={handleSignupInputChange}
                    />
                    {formErrors.password && (
                      <div className="invalid-feedback">
                        {formErrors.password}
                      </div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div
          className="modal show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowLoginModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        formErrors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      name="email"
                      value={loginFormData.email}
                      onChange={handleLoginInputChange}
                    />
                    {formErrors.email && (
                      <div className="invalid-feedback">{formErrors.email}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        formErrors.password ? "is-invalid" : ""
                      }`}
                      id="password"
                      name="password"
                      value={loginFormData.password}
                      onChange={handleLoginInputChange}
                    />
                    {formErrors.password && (
                      <div className="invalid-feedback">
                        {formErrors.password}
                      </div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
