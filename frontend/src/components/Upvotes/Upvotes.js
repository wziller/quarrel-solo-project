import React, { useEffect, useState, updateState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions, updateVoteTotals } from "../../store/questions";
import { getVotes } from "../../store/votes";
import { createVote, deleteVote, updateVote } from "../../store/votes";
import DeleteQuestionButton from "../DeleteQuestionModal/DeleteQuestionModal";
import "./upvotes.css";

const Upvotes = ({ question, userId, userVote, setCount}) => {
  const dispatch = useDispatch()
  const [voteCount1, setVoteCount1] = useState();
  const [voteCount2, setVoteCount2] = useState();
  const users = useSelector(state=> state.users.list)
  const questionId = question?.id
  const user1 = users.find(user => user.id === question.user1_id)
  const user2 = users.find(user => user.id === question.user2_id)

  const user1Click = () =>{
    if(!userVote){
      const newVote = {
        vote:'user1',
        user_id:userId,
        question_id:questionId
      }
      dispatch(createVote({newVote}))
      dispatch(updateVoteTotals())
    }
    userVote && userVote.vote === 'user1' ? dispatch(deleteVote(userVote.id)) : dispatch(updateVote(userVote))
    dispatch(updateVoteTotals())
    dispatch(getQuestions())
  }

  const user2Click = () => {

    if(!userVote){
      const newVote = {
        vote:'user2',
        user_id:userId,
        question_id:questionId
      }
      dispatch(createVote({newVote}))
      dispatch(updateVoteTotals())
    }
    userVote && userVote.vote === 'user2' ? dispatch(deleteVote(userVote.id)) : dispatch(updateVote(userVote))
    dispatch(updateVoteTotals())
  }

  useEffect(()=>{dispatch(getQuestions())},[updateVoteTotals])

  if(!userVote) return (
  <div className='votes_container'>
    <div className='arrow_container'>
      <i className="fas fa-arrow-circle-up fa-3x grey" onClick={user1Click}></i>
      {`${user1?.username} votes: ${question.user1_upvotes}   `}
    </div>
    <gap></gap>
    <div className='arrow_container'>
      <i className="fas fa-arrow-circle-up fa-3x blue" onClick={user2Click}></i>
      {`${user2?.username} votes: ${question.user2_upvotes}  `}
    </div>

  </div>)

 switch(userVote.vote){
   case 'user1':
     return(
      <div className='votes_container'>
        <div className='arrow_container'>
          <i className="fas fa-arrow-circle-up fa-3x red" onClick={user1Click}></i>
          {`${user1?.username} votes: ${question.user1_upvotes}   `}
        </div>
        <div className='arrow_container'>
          <i className="fas fa-arrow-circle-up fa-3x grey" onClick={user2Click}></i>
          {`${user2?.username} votes: ${question.user2_upvotes}   `}
        </div>
      </div>
     )
     case 'user2':
      return(
       <div className='votes_container'>
         <div className='arrow_container'>
          <i className="fas fa-arrow-circle-up fa-3x grey" onClick={user1Click}></i>
          {`${user1?.username} votes: ${question.user1_upvotes}`}
         </div>
         <div className='arrow_container'>
          <i className="fas fa-arrow-circle-up fa-3x blue" onClick={user2Click}></i>
          {`${user2?.username} votes: ${question.user2_upvotes}`}
         </div>
       </div>
      )
      default:

}

};

export default Upvotes;
