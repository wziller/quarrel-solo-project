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
  const [voteCount1, setVoteCount1] = useState(0) ;
  const [voteCount2, setVoteCount2] = useState(0) ;
  const red =
    "https://res.cloudinary.com/degiqnn5d/image/upload/v1634345702/red-arrow_qdz2eu.png";
  const blue =
    "https://res.cloudinary.com/degiqnn5d/image/upload/v1634345702/blue-arrow_kfqqlo.png";
  const grey =
    "https://res.cloudinary.com/degiqnn5d/image/upload/v1634345704/grey-arrow_rjbaln.png";
    useEffect(async () => {
      dispatch(await getVotes());
    }, [dispatch]);



    const [user1Selected, setUser1Selected] = useState("")
  const [user2Selected, setUser2Selected] = useState("")

   useEffect(async () => {
    sortedVotes && setVoteCount1(sortedVotes[questionId]?.user1);
    sortedVotes && setVoteCount2(sortedVotes[questionId]?.user2);
  }, [dispatch, sortedVotes, allVotes, user1Selected, user2Selected]);

  useEffect(async ()=> {
    setUser1Selected(userVote?.vote === "user1" ? red : grey)
    setUser2Selected(userVote?.vote === "user2" ? blue : grey)
  },[])
  const changeVoteRed = () => {
    const newVote = {
      vote: "user1",
      question_id: questionId,
      user_id: userId,
    };

    switch (userVote?.vote) {
      case "user1":

        setUser1Selected(grey)
        dispatch(deleteVote(userVote));
        setCount(prev=> prev + 1)
        break;
      case "user2": {
        userVote.vote = "user1";
        setUser1Selected(red)
        setUser2Selected(grey)
        dispatch(updateVote(userVote));
        setCount(prev=> prev + 1)
        break;
      }
      case undefined:

        setUser1Selected(red)
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
        setUser2Selected(grey)
        setCount(prev=> prev + 1)
        dispatch(deleteVote(userVote));
        break;
      case "user1": {
        userVote.vote = "user2";
        setUser1Selected(grey)
        setUser2Selected(blue)
        dispatch(updateVote(userVote));
        setCount(prev=> prev + 1)
        break;
      }
      case undefined:
        setUser2Selected(blue)
        dispatch(createVote(newVote));
        setCount(prev=> prev + 1)
        break;
    }
  };

  return allVotes && sortedVotes && voteCount1 && voteCount2 ? (
    <div className="upVotesContainer">
      <img
        className="arrow"
        src={user1Selected}
        onClick={() => changeVoteRed()}
      ></img>
      <p className="user1Upvotes">{`Votes: ${voteCount1}`}</p>
      <p className="user2Upvotes">{`Votes: ${voteCount2}`}</p>
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
