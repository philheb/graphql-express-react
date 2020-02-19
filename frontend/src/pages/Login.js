import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const { login } = useContext(AuthContext);
  const [values, setValues] = useState({
    email: "test@test.com",
    password: "123456",
    error: "",
    loading: false,
    message: "",
    showForm: true
  });

  // const { email, password, error, loading, message, showForm } = values;
  const { email, password } = values;

  const handleChange = input => e => {
    setValues({ ...values, error: false, [input]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        login(
          resData.data.login.token,
          resData.data.login.userId,
          resData.data.login.tokenExpiration
        );
      })
      .catch(err => console.log(err));
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            onChange={handleChange("email")}
            type='email'
            className='form-control'
            placeholder='Email'
            value={email}
            required
          />
        </div>
        <div className='form-group'>
          <input
            onChange={handleChange("password")}
            type='password'
            className='form-control'
            placeholder='Password'
            value={password}
            required
          />
        </div>
        <div>
          <button className='btn btn-primary'>Log In</button>
        </div>
      </form>
    );
  };
  return (
    <div className='container' style={{ maxWidth: 500, marginTop: "120px" }}>
      <h2 className='mb-4 text-center'>Log In</h2>
      {loginForm()}
    </div>
  );
};

export default Auth;
