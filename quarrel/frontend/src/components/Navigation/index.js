import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import MyQuestionsButton from './MyQuestionsButton'
import LoginFormModal from '../LoginFormModal';
import CreateQuestionFormModal from '../CreateQuestionFormModal/index';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <ProfileButton user={sessionUser} />
        <CreateQuestionFormModal user={sessionUser} />
        <MyQuestionsButton user={sessionUser} />
      </div>

    );
  } else {
    sessionLinks = (
      <>

        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
