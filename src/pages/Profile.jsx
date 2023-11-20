import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import EditNameForm from '../components/EditNameForm'
import Transaction from '../components/Transaction'
import { userPost } from '../features/slices/userSlice'
import Button from '../components/Button'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userName = useSelector((state) => state.user.userName)
  const token = JSON.parse(localStorage.getItem('token'))

  const [toggleEditForm, setToggleEditForm] = useState(false)

  useEffect(() => {
    if (!token) {
      navigate('/user/signin')
      return
    }
    dispatch(userPost({ token }))
  }, [token, navigate, dispatch])

  const toggleEdit = () => {
    if (token) {
      setToggleEditForm((current) => !current)
    }
  }

  return (
    <>
      <main className='main bg-dark'>
        <div className='header'>
          {toggleEditForm ? (
            <>
              <EditNameForm
                onClickToggle={toggleEdit}
                onClickToggleSave={toggleEdit}
              />
            </>
          ) : (
            <>
              <h1>
                Welcome back
                <br />
                {userName}
              </h1>
              <Button className={'edit-button'} onClick={toggleEdit}>
                Edit Name
              </Button>
            </>
          )}
        </div>
        <h2 className='sr-only'>Accounts</h2>
        <Transaction
          title='Argent Bank Checking (x8349)'
          amount='$2,082.79'
          description='Available Balance'
        />
        <Transaction
          title='Argent Bank Savings (x6712)'
          amount='$10,928.42'
          description='Available Balance'
        />
        <Transaction
          title='Argent Bank Credit Card (x8349)'
          amount='$184.30'
          description='Current Balance'
        />
      </main>
    </>
  )
}

export default Profile
