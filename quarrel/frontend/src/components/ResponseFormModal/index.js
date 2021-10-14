import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ResponseForm from './ResponseForm';


function ResponseFormModal(question) {
  const [showModal, setShowModal] = useState(false);
  console.log(question)

  return (
    <>
      <button onClick={() => setShowModal(true)}>Respond</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ResponseForm propQuestion={question} />
        </Modal>
      )}
    </>
  );
}

export default ResponseFormModal;
