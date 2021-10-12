import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateQuestionForm from './CreateQuestionForm';

function CreateQuestionFormModal() {
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowQuestionModal(true)}>Create New Question</button>
      {showQuestionModal && (
        <Modal onClose={() => setShowQuestionModal(false)}>
          <CreateQuestionForm />
        </Modal>
      )}
    </>
  );
}

export default CreateQuestionFormModal;
