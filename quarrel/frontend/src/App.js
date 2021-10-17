import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import MainQuestionsBox from "./components/MainQuestionBox";
import CategoryQuestionsBox from "./components/CategoryQuestionBox";
import MyQuestionsPage from "./components/MyQuestionsPage";
import CategoriesList from "./components/CategoriesList";
import IndividualQuestionBox from "./components/IndividualQuestionBox/index";
import TopQuestions from "./components/TopQuestions";
import MyQuestionsModal from "./components/MyQuestionsPage";
import './index.css'
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
              <div className="MainPageContent">
                <div className="LeftMainDiv">
                  <CategoriesList />
                </div>
                <div className="RightMainDiv">
                  <MainQuestionsBox className="MainQuestionsBox" />
                  <TopQuestions />
                </div>
              </div>
            </Route>
            <Route path="/questions/category/:id">
              <div className="MainPageContent">
                <div className="LeftMainDiv">
                  <CategoriesList />
                </div>
                <div className="RightMainDiv">
                  <CategoryQuestionsBox className="MainQuestionsBox" />
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
            <Route path="/myquestions/:id">
              <MyQuestionsPage />
            </Route>
          </Switch>
      )}
    </>
  );
}

export default App;
