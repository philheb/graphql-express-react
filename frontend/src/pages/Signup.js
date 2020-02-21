import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Auth = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
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
        mutation CreateUser($email: String!, $password: String!){
          createUser(userInput: {email: $email, password: $password}) {
            _id
            email
          }
        }
      `,
      variables: { email: email, password: password }
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
        history.push("/login");
      })
      .catch(err => console.log(err));
  };

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            onChange={handleChange("email")}
            type='email'
            className='form-control'
            placeholder='Email'
            value={email}
          />
        </div>
        <div className='form-group'>
          <input
            onChange={handleChange("password")}
            type='password'
            className='form-control'
            placeholder='Password'
            value={password}
          />
        </div>
        <div>
          <button className='btn btn-primary'>Sign Up</button>
        </div>
      </form>
    );
  };
  return (
    <div className='container' style={{ maxWidth: 500, marginTop: "120px" }}>
      <h2 className='mb-4 text-center'>Sign Up</h2>
      {signupForm()}
    </div>
  );
};

export default Auth;
