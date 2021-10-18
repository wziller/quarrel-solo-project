import { useDispatch } from "react-redux";
import {deleteQuestion} from "../../store/questions"

function DeleteQuestionButton({showModal, questionId}) {
  const dispatch = useDispatch();

  const handleDeleteClick = (e) => {
    e.preventDefault();

    (dispatch(deleteQuestion({questionId})))
    showModal(false);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    showModal(false);
  };

  return (
    <div>
      <h2>Are you sure you want to DELETE this question?</h2>
      <h3>Deleting Questions is permanent!</h3>
      <button onClick={handleDeleteClick}>DELETE</button>
      <button onClick={handleCancelClick}>Cancel</button>
    </div>
  )
}

export default DeleteQuestionButton;
