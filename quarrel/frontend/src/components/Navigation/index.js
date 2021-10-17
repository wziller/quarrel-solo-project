import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import MyQuestionsButton from './MyQuestionsButton'
import LoginFormModal from '../LoginFormModal';
import * as sessionActions from '../../store/session';
import Logo from '../Logo'
import CreateQuestionFormModal from '../CreateQuestionFormModal/index';
import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [ credential, setCredential ] = useState('');
  const [ password, setPassword ] = useState('');

  const demoLogin = async () => {
      setCredential("Demo_User")
      setPassword("password")
      return dispatch(sessionActions.login({ credential: "Demo_User", password: "password" }))
  }


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="navComponents">

        <Logo />
        <div className='navButtons'>

          <NavLink exact to="/">
            <button className="homeButton">Home</button>
          </NavLink>
          <ProfileButton user={sessionUser} />
          <CreateQuestionFormModal user={sessionUser} />
          <MyQuestionsButton user={sessionUser} />
        </div>
      </div>

    );
  } else {
    sessionLinks = (
      <>
        <button className="demo-login-button" onClick={demoLogin}>
              Demo User
        </button>
        <Logo />
        <NavLink exact to="/">Home</NavLink>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
