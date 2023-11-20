import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { signInUser } from '../features/slices/loginSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/Button'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)
  const [emptyFormError, setEmptyFormError] = useState('')

  const token = JSON.parse(localStorage.getItem('token'))

  const login = useSelector((state) => state.signin.login)
  let error = useSelector((state) => state.signin.error)

  const errorToDisplay = emptyFormError || error

  useEffect(() => {
    if (error) {
      setEmptyFormError('')
    }
    if (login && token) {
      navigate('/user/profile')
    }
  }, [error, dispatch, login, token, navigate])

  const handleLogin = (e) => {
    e.preventDefault()
    if (email !== '' && password !== '') {
      dispatch(signInUser({ email, password }))
      return
    }
    setEmptyFormError('Veullez remplir tous les champs du formulaire')
  }

  const handleGoToSignUp = (e) => {
    e.preventDefault()
    navigate('/user/signup')
  }

  const toggleChecked = () => {
    setChecked((state) => !state)
  }

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
            {errorToDisplay && (
              <div className='sign-in-error'>{errorToDisplay}</div>
            )}
            <div className='input-remember'>
              <input
                type='checkbox'
                id='remember-me'
                defaultChecked={checked}
                onChange={toggleChecked}
              />
              <label htmlFor='remember-me'>Remember me</label>
            </div>
            <Button onClick={handleLogin}>
              Sign In
            </Button>
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
  )
}

export default SignIn
