import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { logout, signInUser } from "../features/slices/loginSlice";
import { userPost } from "../features/slices/userSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useSelector((state) => state.signin.login);
  const loginStatus = useSelector((state) => state.signin.status);
  const error = useSelector((state) => state.signin.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (error) {
      return () => {
        dispatch(logout());
      };
    }
    else if(loginStatus === "fulfilled" && login && token) {
      dispatch(userPost({ token }));
      navigate("/user/profile");
    }
  }, [login, loginStatus, token, error, dispatch, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  const handleGoToSignUp = (e) => {
    e.preventDefault();
    navigate("/user/signup");
  };

  return (
    <>
      <main className='main bg-dark'>
        <section className='sign-in-content'>
          <FontAwesomeIcon className='sign-in-icon' icon={faCircleUser} />
          <h1>Sign In</h1>
          <form>
            <div className='input-wrapper'>
              <label htmlFor='username'>Username</label>
              <input
                type='email'
                id='username'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* {error && <div className="">{error}</div>} */}
            </div>
            <div className='input-wrapper'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className='sign-in-error'>{error}</div>}
            <div className='input-remember'>
              <input type='checkbox' id='remember-me' />
              <label htmlFor='remember-me'>Remember me</label>
            </div>
            <button className='sign-in-button' onClick={handleLogin}>
              Sign In
            </button>
            <div className=''>Don't have an account ?</div>
            <Link
              to='user/signup'
              onClick={handleGoToSignUp}
              className='main-nav-item'
            >
              Sign up !
            </Link>
          </form>
        </section>
      </main>
    </>
  );
};

export default SignIn;