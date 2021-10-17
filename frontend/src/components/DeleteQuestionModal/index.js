import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteQuestionButton from "./DeleteQuestionModal";

function DeleteQuestionModal({ questionId }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete Question</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteQuestionButton
            showModal={setShowModal}
            questionId={questionId}
          />
        </Modal>
      )}
    </>
  );
}

export default DeleteQuestionModal;
