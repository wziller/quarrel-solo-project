import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteCommentButton from "./DeleteCommentModal";

function DeleteCommentModal({ commentId }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete Comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteCommentButton
            showModal={setShowModal}
            commentId={commentId}
          />
        </Modal>
      )}
    </>
  );
}

export default DeleteCommentModal;
