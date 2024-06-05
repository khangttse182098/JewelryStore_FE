import { useContext, useState } from "react";
import classes from "./SignInForm.module.css";
import { useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../../context/LoggedInUserContext";

const defaultFormField = {
  username: "",
  password: "",
};

const SignInForm = () => {
  const [formField, setFormField] = useState(defaultFormField);
  const [isWrong, setIsWrong] = useState(false);
  const { setUserId } = useContext(LoggedInUserContext);
  const { username, password } = formField;
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch("http://mahika.foundation:8080/swp/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formField),
    })
      .then((res) => res.json())
      .then((data) => {
        {
          data.roleCode && setUserId(data.userId);
        }
        if (data.roleCode === "SELLER") {
          setIsWrong(false);
          navigate("/sellpage");
        } else if (data.roleCode === "CASHIER") {
          setUserId(data.userId);
          navigate("/invoicelist");
          setIsWrong(false);
        } else {
          setIsWrong(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  return (
    <div className={classes["sign-up-container"]}>
      <h2 className={classes.h2}>Login</h2>
      <form className={classes.form} onSubmit={handleSubmit}>
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
        {isWrong && (
          <p
            style={{ color: "#cc0000", textAlign: "center", marginTop: "5px" }}
          >
            Wrong username or password!
          </p>
        )}
      </form>
    </div>
  );
};

export default SignInForm;
