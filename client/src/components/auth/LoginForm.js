import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layouts/AlertMessage";

const LoginForm = () => {
  //Context
  const { loginUser } = useContext(AuthContext);

  //Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginForm;

  const [alert, setAlert] = useState(null);

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      await loginUser(loginForm);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="my-4 " onSubmit={submitForm}>
        <AlertMessage info={alert} />
        <input
          className="form-input block w-[360px] rounded-md p-1 mx-auto outline-none"
          type="text"
          placeholder="Username"
          name="username"
          required
          value={username}
          onChange={onChangeLoginForm}
        />

        <input
          className="form-input block w-[360px] rounded-md p-1 mx-auto outline-none"
          type="password"
          placeholder="Password"
          name="password"
          required
          value={password}
          onChange={onChangeLoginForm}
        />

        <button
          variant="success"
          type="submit"
          className="font-medium text-xl text-[#1a1919] py-1 px-3 mt-3 bg-[#9eb1ee] rounded-md hover:bg-[#66a3d2]"
        >
          Login
        </button>
      </form>
      <p className="font-medium text-xl text-[#5f1c9a] p-1">
        Don't have an account?
        <Link to="/register">
          <button
            variant="info"
            className="ml-2 font-medium text-xl text-[#2f1249] bg-[#abb0c1] rounded-md p-1"
          >
            Register
          </button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
