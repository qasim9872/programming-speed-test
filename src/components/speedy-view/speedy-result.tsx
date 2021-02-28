import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const SpeedyResult: React.FC<{
  open: boolean;
  onCloseModal: () => void;
  score: number;
}> = ({ open, onCloseModal, score }) => {
  return (
    <Modal open={open} onClose={onCloseModal} center>
      <div className="flex m-5 p-5 text-black">
        <h1>Your average WPM is {score}</h1>
      </div>
    </Modal>
  );
};

export default SpeedyResult;
