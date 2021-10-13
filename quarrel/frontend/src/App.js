import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import MainQuestionsBox from "./components/MainQuestionBox";
import CategoriesList from "./components/CategoriesList";
import IndividualQuestionBox from "./components/IndividualQuestionBox/index";
import TopQuestions from "./components/TopQuestions";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
          <Switch>
            <Route exact path="/">
              <div id="MainPageContent">
                <div id="LeftMainDiv">
                  <CategoriesList />
                </div>
                <div id="RightMainDiv">
                  <MainQuestionsBox />
                  <TopQuestions />
                </div>
              </div>
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/questions/:id">
              <IndividualQuestionBox />
            </Route>
          </Switch>
      )}
    </>
  );
}

export default App;
