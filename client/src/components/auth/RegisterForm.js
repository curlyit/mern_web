import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layouts/AlertMessage";
import Notification from "../../views/Notification";

const RegisterForm = () => {
  const { registerUser } = useContext(AuthContext);

  //Local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    numberPhone: "",
    password: "",
    confirmPassword: "",
  });

  const { username, numberPhone, password, confirmPassword } = registerForm;

  const [alert, setAlert] = useState(null);

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const submitForm = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({
        type: "danger",
        message: "Password and Re-password do not match",
      });
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    try {
      await registerUser(registerForm);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="my-4" onSubmit={submitForm}>
        <AlertMessage info={alert} />
        <input
          className="form-input block w-[360px] rounded-md p-1 mx-auto outline-none"
          type="text"
          placeholder="Username"
          name="username"
          required
          value={username}
          onChange={onChangeRegisterForm}
        />
        <input
          className="form-input block w-[360px] rounded-md p-1 mx-auto outline-none"
          type="text"
          placeholder="Phone number"
          name="numberPhone"
          required
          value={numberPhone}
          onChange={onChangeRegisterForm}
        />
        <input
          className="form-input block w-[360px] rounded-md p-1 mx-auto outline-none"
          type="password"
          placeholder="Password"
          name="password"
          required
          value={password}
          onChange={onChangeRegisterForm}
        />

        <input
          className="form-input block w-[360px] rounded-md p-1 mx-auto outline-none"
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          required
          value={confirmPassword}
          onChange={onChangeRegisterForm}
        />

        <button
          variant="success"
          type="submit"
          className="font-medium text-xl text-[#1a1919] py-1 px-3 mt-3 bg-[#9eb1ee] rounded-md hover:bg-[#66a3d2]"
        >
          Register
        </button>
      </form>
      <p className="font-medium text-xl text-[#5f1c9a] p-1">
        Already have an account?
        <Link to="/login">
          <button
            variant="info"
            className="ml-2 font-medium text-xl text-[#2f1249] bg-[#abb0c1] rounded-md p-1"
          >
            Login
          </button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
