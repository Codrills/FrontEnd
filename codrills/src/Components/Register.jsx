import React, { Component } from "react";
import axios from "axios"

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;


  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });


  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

const blankState = {
  first_name: null,
  last_name: null,
  email: null,
  password: null,
}

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      shop_name: null,
      location_id: '',
      formErrors: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        shop_name: "",
        location_id: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      const copyofState = {...this.state};
      delete copyofState['formErrors'] ;
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.first_name}
        Last Name: ${this.state.last_name}
        Email: ${this.state.email}
        Password: ${this.state.password}
        Shop Name: ${this.state.shop_name}
        Location: ${this.state.location_id}
      `);
      axios.post('', copyofState)
        .then(res => {
          console.log(`AXIOS SUCCESS!`, res.data);
          alert(res.data.message);
        })
        .catch(err => {
          console.log(`AXIOS FAILURE!`, err);
          alert(err);
        })
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      alert('there was an error!')
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "first_name":
        formErrors.first_name =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "last_name":
        formErrors.last_name =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characters required" : "";
        break;
      case "shop_name":
        formErrors.shop_name =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="first_name">
              <label htmlFor="first_name">First Name</label>
              <input
                className={formErrors.first_name.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="first_name"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.first_name.length > 0 && (
                <span className="errorMessage">{formErrors.first_name}</span>
              )}
            </div>
            <div className="last_name">
              <label htmlFor="last_name">Last Name</label>
              <input
                className={formErrors.last_name.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="last_name"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.last_name.length > 0 && (
                <span className="errorMessage">{formErrors.last_name}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account? Click Here</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Registration;