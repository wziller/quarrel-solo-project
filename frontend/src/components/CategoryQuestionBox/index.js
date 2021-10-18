import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionsByCategory } from "../../store/questions";
import { getUsers } from '../../store/users';
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getVotes } from "../../store/votes";
import UpvotesDisplay from "../Upvotes";
import "./CategoryQuestionsBox.css";

function CategoryQuestionsBox() {
  const dispatch = useDispatch();
  const categoryId = useParams().id
  const users = useSelector((state) => state.users.list)
  const votes = useSelector((state) => state.votes.list)
  const questions = useSelector((state) => state.questions.list);
  const sessionUser = useSelector((state) => state.session.user);
  questions.forEach(question =>{
    const id  = question.id
    votes.forEach(vote => {
      if(vote.question_id === id && vote.user1_vote === true) question.user1_upvotes += 1
      if(vote.question_id === id && vote.user2_vote === true) question.user2_upvotes += 1
    })
  })

  useEffect(() => {
    dispatch(getQuestionsByCategory(categoryId));
  }, [dispatch, categoryId]);

  useEffect(() => {
    dispatch(getVotes());
  }, [dispatch, questions]);

  useEffect(()=> {
    dispatch(getUsers())
  },[dispatch, questions])

  return Array.isArray(questions) && questions ? (
    <div id="mainQuestionsContainer">
      <h2>Questions</h2>
      <div>
        {questions?.map((question) => {
          if (question.user2_response)
            return (
              <div key={question.id}>
                <NavLink  to={`/questions/${question.id}`}>
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
                {sessionUser ? <UpvotesDisplay questionId={question.id} userId={sessionUser.id} /> : <p>Login to see voting</p>}
              </div>
            );
        })}
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default CategoryQuestionsBox;