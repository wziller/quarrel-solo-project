import React, { useEffect, useState, updateState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVotes } from "../../store/votes";
import { createVote, deleteVote, updateVote } from "../../store/votes";
import "./upvotes.css";

const Upvotes = ({ questionId, userId, userVote, setCount}) => {
  const dispatch = useDispatch();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const allVotes = useSelector((state) => state.votes.list);
  const sortedVotes = useSelector((state) => state.votes.sorted);


  const red =
    "https://res.cloudinary.com/degiqnn5d/image/upload/v1634345702/red-arrow_qdz2eu.png";
  const blue =
    "https://res.cloudinary.com/degiqnn5d/image/upload/v1634345702/blue-arrow_kfqqlo.png";
  const grey =
    "https://res.cloudinary.com/degiqnn5d/image/upload/v1634345704/grey-arrow_rjbaln.png";

  const [user1Selected] = useState(
    userVote?.vote === "user1" ? red : grey
  );
  const [user2Selected] = useState(
    userVote?.vote === "user2" ? blue : grey
  );


  const changeVoteRed = () => {
    const newVote = {
      vote: "user1",
      question_id: questionId,
      user_id: userId,
    };

    switch (userVote?.vote) {
      case "user1":
        dispatch(deleteVote(userVote));
        setCount(prev=> prev + 1)
        break;
      case "user2": {
        userVote.vote = "user1";
        dispatch(updateVote(userVote));
        setCount(prev=> prev + 1)
        break;
      }
      case undefined:
        dispatch(createVote(newVote));
        setCount(prev=> prev + 1)
        break;
    }
  };

  const changeVoteBlue = () => {
    const newVote = {
      vote: "user2",
      question_id: questionId,
      user_id: userId,
    };

    switch (userVote?.vote) {
      case "user2":
        dispatch(deleteVote(userVote));
        setCount(prev=> prev + 1)
        break;
      case "user1": {
        userVote.vote = "user2";
        dispatch(updateVote(userVote));
        setCount(prev=> prev + 1)
        break;
      }
      case undefined:
        dispatch(createVote(newVote));
        setCount(prev=> prev + 1)
        break;
    }
  };

  return allVotes && sortedVotes ? (
    <div className="upVotesContainer">
      <img
        className="arrow"
        src={user1Selected}
        onClick={() => changeVoteRed()}
      ></img>
      <p className="user1Upvotes">{`Votes: ${sortedVotes[questionId].user1}`}</p>
      <p className="user2Upvotes">{`Votes: ${sortedVotes[questionId].user2}`}</p>
      <img
        className="arrow"
        src={user2Selected}
        onClick={() => changeVoteBlue()}
      ></img>
    </div>
  ) : (
    <div></div>
  );
};

export default Upvotes;
