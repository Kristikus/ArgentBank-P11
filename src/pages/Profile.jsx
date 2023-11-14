import { useState } from "react";
import { useSelector } from "react-redux";

import EditNameForm from "../components/EditNameForm";

const Profile = () => {
  const userName = useSelector((state) => state.user.userName);
  const login = useSelector((state) => state.signin.login);

  const [toggleEditForm, setToggleEditForm] = useState(false);

  const toggleEdit = () => {
    if (login) {
      setToggleEditForm((current) => !current);
    }
  };

  return (
    <>
      <main className='main bg-dark'>
        <div className='header'>
          {toggleEditForm ? (
            <>
              <EditNameForm onClickToggle={toggleEdit} onClickToggleSave={toggleEdit} />
            </>
          ) : (
            <>
              <h1>
                Welcome back
                <br />
                {userName}
              </h1>
              <button className='edit-button' onClick={toggleEdit}>
                Edit Name
              </button>
            </>
          )}
        </div>
        <h2 className='sr-only'>Accounts</h2>
        <section className='account'>
          <div className='account-content-wrapper'>
            <h3 className='account-title'>Argent Bank Checking (x8349)</h3>
            <p className='account-amount'>$2,082.79</p>
            <p className='account-amount-description'>Available Balance</p>
          </div>
          <div className='account-content-wrapper cta'>
            <button className='transaction-button'>View transactions</button>
          </div>
        </section>
        <section className='account'>
          <div className='account-content-wrapper'>
            <h3 className='account-title'>Argent Bank Savings (x6712)</h3>
            <p className='account-amount'>$10,928.42</p>
            <p className='account-amount-description'>Available Balance</p>
          </div>
          <div className='account-content-wrapper cta'>
            <button className='transaction-button'>View transactions</button>
          </div>
        </section>
        <section className='account'>
          <div className='account-content-wrapper'>
            <h3 className='account-title'>Argent Bank Credit Card (x8349)</h3>
            <p className='account-amount'>$184.30</p>
            <p className='account-amount-description'>Current Balance</p>
          </div>
          <div className='account-content-wrapper cta'>
            <button className='transaction-button'>View transactions</button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
