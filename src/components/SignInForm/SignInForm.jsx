import { useState } from "react";
import classes from "./SignInForm.module.css";

const defaultFormField = {
  username: "",
  password: "",
};

const SignInForm = () => {
  const [formField, setFormField] = useState(defaultFormField);
  const { username, password } = formField;

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formField),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  // log what user type into the form
  // console.log(formField);
  // command line

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  return (
    <div className={classes["sign-up-container"]}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={classes["input-field"]}
          placeholder="Username"
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          required
        />
        <input
          className={classes["input-field"]}
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <div className={classes["button-container"]}>
          <button type="submit" className={classes["form-button"]}>
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
