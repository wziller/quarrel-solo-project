import Upvotes from "./Upvotes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVotes } from "../../store/votes";
import "./upvotes.css";
import { updateVoteTotals } from "../../store/questions";

const UpvotesDisplay = ({ question, userId }) => {
  const dispatch = useDispatch();
  const allVotes = useSelector((state) => state.votes.list);
  const sortedVotes = useSelector((state) => state.votes.sorted);
  const questionId = question?.id
  const [count, setCount] = useState(1);
  const [userVote,setUserVote] = useState(allVotes.find(
    async (vote) => await vote.user_id === userId && vote.question_id === questionId
  ));
    console.log("useVote================>", userVote)
    console.log("allVotes================>", allVotes)
    console.log("userId=================>", userId)
  // const userVote = allVotes.find(
  //   (vote) => vote.user_id === userId && vote.question_id === questionId
  // );

useEffect(()=> {
  dispatch(getVotes())
  dispatch(updateVoteTotals())
},[dispatch, setUserVote])

  return (
    <div className="upvotesDisplayContainer">
      <Upvotes
        question={question}
        userId={userId}
        userVote={userVote}
        setUserVote={setUserVote}
      />
    </div>
  );
};

export default UpvotesDisplay;
