import React, { useEffect, useState, updateState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions, updateVoteTotals } from "../../store/questions";
import { getVotes } from "../../store/votes";
import { createVote, deleteVote, updateVote } from "../../store/votes";
import DeleteQuestionButton from "../DeleteQuestionModal/DeleteQuestionModal";
import "./upvotes.css";
const Upvotes = ({ question, userId, userVote, setUserVote }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const questionId = question?.id;
  const user1 = users.find((user) => user.id === question?.user1_id);
  const user2 = users.find((user) => user.id === question?.user2_id);
  const [user1UpvoteTotals, setUser1UpvoteTotals] = useState(question?.user1_upvotes)
  const [user2UpvoteTotals, setUser2UpvoteTotals] = useState(question?.user2_upvotes)
  const user1Click = () => {

    if (!userVote) {
      console.log("uservotte===========>", userVote)
      const newVote = {
        vote: "user1",
        user_id: userId,
        question_id: questionId,
      };
      setUserVote(dispatch(createVote({ newVote })));
      dispatch(updateVoteTotals());
      dispatch(getQuestions())
      setUser1UpvoteTotals(question.user1_upvotes)
      setUser2UpvoteTotals(question.user2_upvotes)
      return
    }
    userVote && userVote.vote === "user1"
      ? dispatch(deleteVote(userVote))
      : dispatch(updateVote(userVote));
    dispatch(updateVoteTotals());
    setUser1UpvoteTotals(question.user1_upvotes)
    setUser2UpvoteTotals(question.user2_upvotes)
  };

  const user2Click = () => {

    if (!userVote) {
      console.log("uservotte===========>", userVote)
      const newVote = {
        vote: "user2",
        user_id: userId,
        question_id: questionId,
      };
      dispatch(createVote({ newVote }));
      dispatch(updateVoteTotals());
      setUser1UpvoteTotals(question.user1_upvotes)
      setUser2UpvoteTotals(question.user2_upvotes)
      return
    }
    userVote && userVote.vote === "user2"
      ? dispatch(deleteVote(userVote))
      : dispatch(updateVote(userVote));
    dispatch(updateVoteTotals());
    setUser1UpvoteTotals(question.user1_upvotes)
    setUser2UpvoteTotals(question.user2_upvotes)
  };

  useEffect(() => {
    dispatch(getQuestions());
  }, [updateVoteTotals, deleteVote, updateVote, createVote]);
  useEffect(()=> {

  },[dispatch, setUser1UpvoteTotals, setUser2UpvoteTotals])

  if (!userVote)
    return (
      <div className="votes_container">
        <div className="arrow_container">
          <i
            className="fas fa-arrow-circle-up fa-3x grey"
            onClick={user1Click}
          ></i>
          {`${user1?.username} votes: ${user1UpvoteTotals}   `}
        </div>
        <gap></gap>
        <div className="arrow_container">
          <i
            className="fas fa-arrow-circle-up fa-3x grey"
            onClick={user2Click}
          ></i>
          {`${user2?.username} votes: ${user2UpvoteTotals}  `}
        </div>
      </div>
    );

  switch (userVote.vote) {
    case "user1":
      return (
        <div className="votes_container">
          <div className="arrow_container">
            <i
              className="fas fa-arrow-circle-up fa-3x red"
              onClick={user1Click}
            ></i>
            {`${user1?.username} votes: ${user1UpvoteTotals}   `}
          </div>
          <div className="arrow_container">
            <i
              className="fas fa-arrow-circle-up fa-3x grey"
              onClick={user2Click}
            ></i>
            {`${user2?.username} votes: ${user2UpvoteTotals}   `}
          </div>
        </div>
      );
    case "user2":
      return (
        <div className="votes_container">
          <div className="arrow_container">
            <i
              className="fas fa-arrow-circle-up fa-3x grey"
              onClick={user1Click}
            ></i>
            {`${user1?.username} votes: ${user1UpvoteTotals}`}
          </div>
          <div className="arrow_container">
            <i
              className="fas fa-arrow-circle-up fa-3x blue"
              onClick={user2Click}
            ></i>
            {`${user2?.username} votes: ${user2UpvoteTotals}`}
          </div>
        </div>
      );
    default:
  }
};

export default Upvotes;
