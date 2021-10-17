import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ResponseForm from './ResponseForm';


function ResponseFormModal(question) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Respond</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ResponseForm propQuestion={question} showModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default ResponseFormModal;
