import Upvotes from "./Upvotes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVotes } from "../../store/votes";
import "./upvotes.css";

const UpvotesDisplay = ({ question, userId }) => {
  const dispatch = useDispatch();
  const allVotes = useSelector((state) => state.votes.list);
  const sortedVotes = useSelector((state) => state.votes.sorted);
  const questionId = question?.id
  const [count, setCount] = useState(1);

  const userVote = allVotes.find(
    (vote) => vote.user_id === userId && vote.question_id === questionId
  );

  useEffect(async () => {
    dispatch(await getVotes());
  }, [dispatch, setCount]);
  return (
    <div className="upvotesDisplayContainer">
      <Upvotes
        question={question}
        userId={userId}
        userVote={userVote}
        setCount={setCount}
      />
    </div>
  );
};

export default UpvotesDisplay;
