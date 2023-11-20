import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/slices/loginSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {
  const dispatch = useDispatch()
  const token = JSON.parse(localStorage.getItem('token'))
  const userName = useSelector((state) => state.user.userName)

  return (
    <>
      <nav className='main-nav'>
        <Link to='/' className='main-nav-logo'>
          <img
            className='main-nav-logo-image'
            src={require('../designs/img/argentBankLogo.webp')}
            alt='Argent Bank Logo'
            loading='lazy'
          />
          <h1 className='sr-only'>Argent Bank</h1>
        </Link>
        {!token ? (
          <NavLink to='user/signin' className='main-nav-item'>
            <FontAwesomeIcon
              className='fa fa-user-circle'
              icon={faCircleUser}
            />
          </NavLink>
        ) : (
          <div className='main-nav-items'>
            <NavLink
              to='user/profile'
              className={({ isActive }) =>
                isActive
                  ? 'main-nav-item router-link-exact-active'
                  : 'main-nav-item'
              }
            >
              {userName}
              <FontAwesomeIcon className='fa' icon={faCircleUser} />
            </NavLink>
            <NavLink
              to='/'
              onClick={() => dispatch(logout())}
              className='main-nav-item'
            >
              <FontAwesomeIcon className='fa' icon={faPowerOff} />
            </NavLink>
            <FontAwesomeIcon className='fa' icon={faGear} />
          </div>
        )}
      </nav>
    </>
  )
}

export default Nav
