import React, { useEffect, useState, updateState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions, getOneQuestion, updateVoteTotals, updateOneQuestionVoteTotals } from "../../store/questions";
import { createVote, deleteVote, updateVote } from "../../store/votes";
import "./upvotes.css";

const Upvotes = ({ question, userId}) => {
  const dispatch = useDispatch()
  const upVoteData = question.upVotes
  const user1 = upVoteData?.userName1
  const user2 = upVoteData?.userName2
  const userVote = upVoteData?.userVote
  const userVoteId = upVoteData?.userVoteId
  const[user1ArrowColor, setUser1ArrowColor] = useState(userVote === "user1" ? "red" : "grey")
  const[user2ArrowColor, setUser2ArrowColor] = useState(userVote === "user2" ? "blue" : "grey")

  const user1Click = async () => {

    const handleChange = async() =>{

    if(userVote === null){
      let newVote ={
        vote:'user1',
        user_id:userId,
        question_id:question.id,
      }
      upVoteData.total1++
      upVoteData.userVote = 'user1'
      setUser1ArrowColor('red')
      await dispatch(createVote(newVote))
    }

    if(userVote === 'user1'){
      upVoteData.total1--
      upVoteData.userVote = null
      setUser1ArrowColor('grey')
      await dispatch(deleteVote(userVoteId))
    }

    if(userVote === 'user2'){
      let currentVote ={
        vote:userVote,
        id:userVoteId,
        user_id:userId,
        question_id:question.id,
      }
      upVoteData.total1++
      upVoteData.total2--
      upVoteData.userVote = 'user1'
      setUser1ArrowColor('red')
      setUser2ArrowColor('grey')
      await dispatch(updateVote(currentVote))
    }
    dispatch(getOneQuestion(question.id,userId))
  }
    handleChange()
  }

  const user2Click = async () => {

    const handleChange = async() =>{

    if(userVote === null){
      let newVote ={
        vote:'user2',
        user_id:userId,
        question_id:question.id,
      }
      upVoteData.total2++
      upVoteData.userVote = 'user2'
      setUser2ArrowColor('blue')

      await dispatch(createVote(newVote))
    }

    if(userVote === 'user2'){
      upVoteData.total2--
      upVoteData.userVote = null
      setUser2ArrowColor('grey')
      await dispatch(deleteVote(userVoteId))
    }

    if(userVote === 'user1'){
      let currentVote ={
        vote:userVote,
        id:userVoteId,
        user_id:userId,
        question_id:question.id,
      }
      upVoteData.total2++
      upVoteData.total1--
      upVoteData.userVote = 'user2'
      setUser2ArrowColor('blue')
      setUser1ArrowColor('grey')
      await dispatch(updateVote(currentVote))
    }


    dispatch(getOneQuestion(question.id,userId))
  }
    handleChange()


  }

  useEffect(()=> {
    
  },[user1ArrowColor, user2ArrowColor])

  useEffect(()=> {
    setUser1ArrowColor(userVote === "user1" ? "red" : "grey")
    setUser2ArrowColor(userVote === "user2" ? "blue" : "grey")
  },[userId])


    return ( userVote !== undefined ?
      <div className="votes_container">
        <div className="arrow_container">
          <i
            className={`fas fa-arrow-circle-up fa-3x ${user1ArrowColor}`}
            onClick={user1Click}
          ></i>
          {`${user1} votes: ${upVoteData.total1}   `}
        </div>
        <div className="arrow_container">
          <i
            className={`fas fa-arrow-circle-up fa-3x ${user2ArrowColor}`}
            onClick={user2Click}
          ></i>
          {`${user2} votes: ${upVoteData.total2}  `}
        </div>
      </div>
    : <div>Loading</div>);

};

export default Upvotes;
