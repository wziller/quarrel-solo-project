import Upvotes from "./Upvotes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVotes, getUpvotes } from "../../store/votes";
import "./upvotes.css";
import { updateVoteTotals } from "../../store/questions";

const UpvotesDisplay = ({ question, userId }) => {
  const dispatch = useDispatch();

  return (
    <div className="upvotesDisplayContainer">
      <Upvotes
        question={question}
        userId={userId}
      />
    </div>
  );
};

export default UpvotesDisplay;
