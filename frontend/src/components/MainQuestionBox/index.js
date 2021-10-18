import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneQuestion, getQuestions } from "../../store/questions";
import { getUsers } from "../../store/users";
import { NavLink } from "react-router-dom";
import AutoComplete from "../Autocomplete/AutoComplete";
import UpvotesDisplay from "../Upvotes";
import "./MainQuestionsBox.css";

function MainQuestionsBox() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);

  const questions = useSelector((state) => state.questions.list);
  const sessionUser = useSelector((state) => state.session.user);
  const [searchedQuestion, setSearchedQuestion] = useState("");
  const questionNames = [];
  questions.forEach((question) => {
    questionNames.push(question.question_name);
  });

  const updateSearchedQuestion =(acInput) =>{
    setSearchedQuestion(acInput)
  }
console.log(searchedQuestion)


  useEffect(()=> {

  }, [searchedQuestion])

  useEffect(async() => {
    await dispatch(getUsers());
    await dispatch(getQuestions());
  }, [dispatch]);

  useEffect(async()=>{
    const questionId = await questions?.find(question=> question.question_name === searchedQuestion)
    questionId && dispatch(getOneQuestion(questionId.id))
  },[searchedQuestion]);

  return questions ? (
    <div id="mainQuestionsContainer">
      <AutoComplete
        suggestions={questionNames}
        placeholder="Search for a question here"
        changeStateFunc={updateSearchedQuestion}
      />
      <h2>Questions</h2>
      <div id="innerQuestionsContiner">
        {questions?.map((question) => {
          if (question.user2_response)
            return (
              <div className={`questionOutermostContainer`} key={question.id}>
                <NavLink to={`/questions/${question.id}`}>
                  <div key={question.id} className="questionCard">
                    <h3>{question.question_name}</h3>
                    <h4 id="descriptiontitle">Question Description</h4>
                    <p>{question.question}</p>
                    <div className="responses">
                      <div className="user_1Response">
                        <p>{`${
                          users?.find((user) => user.id === question.user1_id)
                            ?.username
                        } argues:`}</p>
                        {question.user1_response}
                      </div>
                      <div className="user_2Response">
                        <p>{`${
                          users?.find((user) => user.id === question.user2_id)
                            ?.username
                        } argues:`}</p>
                        {question.user2_response}
                      </div>
                    </div>
                  </div>
                </NavLink>
                {sessionUser ? (
                  <UpvotesDisplay
                    questionId={question.id}
                    userId={sessionUser.id}
                  />
                ) : (
                  <p>Login to see voting</p>
                )}
              </div>
            );
        })}
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default MainQuestionsBox;
