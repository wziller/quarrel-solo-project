import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditCommentButton from "./EditCommentModal";

function EditCommentModal({ commentId,commentBody, changeStateFunc }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCommentButton
            showModal={setShowModal}
            commentId={commentId}
            existingCommentBody={commentBody}
            changeStateFunc={changeStateFunc}
          />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
