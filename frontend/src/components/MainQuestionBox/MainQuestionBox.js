import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getQuestions, updateVoteTotals } from "../../store/questions";
import { getUsers } from "../../store/users";

import AutoComplete from "../Autocomplete/AutoComplete";
import "./MainQuestionsBox.css";

function MainQuestionsBox() {
  const users = useSelector((state) => state.users.list);
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.list);

  useEffect(() => {
    dispatch(getQuestions())
    dispatch(updateVoteTotals())
    dispatch(getUsers());
  }, []);

  return users.length > 0 ? (
    <div id="mainQuestionsContainer">
      <AutoComplete
        suggestions={usernames}
        placeholder="Serach for a question here"
        changeStateFunc={updateUser2_username}
      />
      <h2>Questions</h2>

        {questions.map(
          (question) =>
            question.user1_response && (
              <NavLink key={question.id} to={`/questions/${question.id}`}>
                <div key={question.id} className="questionCard">
                  <h3>{question.question_name}</h3>
                  <h4 id="descriptiontitle">Question Description</h4>
                  <p>{question.question}</p>
                  <div className="responses">
                    <div className="user_1Response">
                      <p>{`test's Argument'`}</p>
                      {question.user1_response}
                      <p>{`Up Votes: ${question.user1_upvotes}`}</p>
                    </div>
                    <div className="user_2Response">
                      {question.user2_response}
                      <p>{`Up Votes: ${question.user2_upvotes}`}</p>
                    </div>
                  </div>
                </div>
              </NavLink>
            )
        )}
      </div>
  ) : (
    <div></div>
  );
}

export default MainQuestionsBox;
