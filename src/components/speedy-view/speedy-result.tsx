import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import { useGlobalConstantsHook } from '../../constants';

const SpeedyResult: React.FC<{
  open: boolean;
  onCloseModal: () => void;
  score: number;
}> = ({ open, onCloseModal, score }) => {
  const [config] = useGlobalConstantsHook();
  const { myGlobalConfig } = config;

  return (
    <Modal open={open} onClose={onCloseModal} center>
      <div className="flex flex-col m-5 p-5 justify-center items-center  text-black">
        <h1 className="text-lg font-bold">Game Ends.</h1>
        <h2>Your average Coding WPM is {score}</h2>

        <h2 className="font-bold pt-5">Share Your Results</h2>
        <div className="flex justify-center items-center">
          <FacebookShareButton
            url={myGlobalConfig.url}
            quote={`My coding speed is ${score} WPM. Find out yours`}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <LinkedinShareButton
            url={myGlobalConfig.url}
            title={`My coding speed is ${score} WPM. Find out yours`}
            className="Demo__some-network__share-button"
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>

          <TwitterShareButton
            url={myGlobalConfig.url}
            title={`My coding speed is ${score} WPM. Find out yours`}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
      </div>
    </Modal>
  );
};

export default SpeedyResult;
