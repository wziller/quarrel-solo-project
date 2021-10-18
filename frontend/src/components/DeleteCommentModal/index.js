import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteCommentButton from "./DeleteCommentModal";

function DeleteCommentModal({ commentId, changeStateFunc }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete Comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteCommentButton
            changeStateFunc={changeStateFunc}
            showModal={setShowModal}
            commentId={commentId}
          />
        </Modal>
      )}
    </>
  );
}

export default DeleteCommentModal;
