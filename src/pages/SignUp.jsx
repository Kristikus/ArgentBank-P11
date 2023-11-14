import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { signUpUser } from "../features/slices/signupSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const loginStatus = useSelector((state) => state.signup.status);
  const error = useSelector((state) => state.signup.error);
  const user = useSelector((state) => state.signup.userName);

  useEffect(() => {
    if (loginStatus === "fulfilled" && user) {
      navigate("/user/signin");
    }
    if (error) {
      console.log(error.message);
    }
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signUpUser({ email, password, firstName, lastName, userName }));
  };

  return (
    <main className='main bg-dark'>
      <section className='sign-in-content sign-up-content'>
        <FontAwesomeIcon className='fa fa-user-circle' icon={faCircleUser} />
        <h1>Sign Up</h1>
        <form>
          <div className='input-wrapper'>
            <label htmlFor='firstName'>FirstName</label>
            <input
              type='text'
              id='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='firstName'>LastName</label>
            <input
              type='text'
              id='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='firstName'>UserName</label>
            <input
              type='text'
              id='userName'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='username'>email</label>
            <input
              type='email'
              id='username'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className='sign-in-error'>{error}</div>}
          <div className='input-remember'>
            <input type='checkbox' id='remember-me' />
            <label htmlFor='remember-me'>Remember me</label>
          </div>
          <button className='sign-in-button' onClick={handleSignUp}>
            Sign up
          </button>
          <Link to='/user/signin' className='main-nav-item'>
            Sign in
          </Link>
        </form>
      </section>
    </main>
  );
};

export default SignUp;
