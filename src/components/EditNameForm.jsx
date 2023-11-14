import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userUpdate } from "../features/slices/userUpdateSlice";
import { userPost } from "../features/slices/userSlice";

const EditNameForm = ({ onClickToggle, onClickToggleSave }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userName);
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const token = JSON.parse(localStorage.getItem("token"));

  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(user);
  }, [user]);

  const SaveUserName = (e) => {
    e.preventDefault();
    dispatch(userUpdate({ token, userName }));
    dispatch(userPost({ token }));
  };

  return (
    <form className='edit-form-content'>
      <h1>Edit user info</h1>
      <div className='edit-form-inputs'>
        <div className='edit-form-input'>
          <label htmlFor='userName'>User name : </label>
          <input
            id='userName'
            type='text'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
        </div>
        <div className='edit-form-input'>
          <label htmlFor='firstName'>First name : </label>
          <input id='firstName' type='text' value={firstName} disabled></input>
        </div>
        <div className='edit-form-input'>
          <label htmlFor='lastName'>Last name : </label>
          <input id='lastName' type='text' value={lastName} disabled></input>
        </div>
      </div>
      <div className='edit-form-buttons'>
        <div className='test' onClick={SaveUserName}>
          <button className='sign-in-button' onClick={onClickToggleSave}>
            Save
          </button>
        </div>
        <div className='test'>
          <button className='sign-in-button' onClick={onClickToggle}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditNameForm;
