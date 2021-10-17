import Upvotes from "./Upvotes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVotes } from "../../store/votes";
import "./upvotes.css";

const UpvotesDisplay = ({ questionId, userId }) => {
  const dispatch = useDispatch();
  const allVotes = useSelector((state) => state.votes.list);
  const sortedVotes = useSelector((state) => state.votes.sorted);
//   const [u2Color, setU2Color] = useState("");
//   const [u1Color, setU1Color] = useState("");
const [count, setCount] = useState(1);

  const userVote = allVotes.find(
    (vote) => vote.user_id === userId && vote.question_id === questionId
  );
  console.log(userVote)

  useEffect(() => {
    dispatch(getVotes());
  }, [dispatch, count]);
  return userVote? (
    <div className="upvotesDisplayContainer">
      <Upvotes questionId={questionId} userId={userId} userVote={userVote} setCount={setCount}   />
    </div>
  ): (<Upvotes questionId={questionId} userId={userId} userVote={userVote} setCount={setCount}   />)
};

export default UpvotesDisplay;
