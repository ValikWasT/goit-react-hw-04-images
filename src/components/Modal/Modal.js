import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, Modal, LargeImg } from './ModalStyled';
const modalRoot = document.querySelector('#modal-root');
export const ModalWindow = ({ largeImg, onClose }) => {
  useEffect(() => {
    const onClickEscape = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onClickEscape);

    return () => {
      window.removeEventListener('keydown', onClickEscape);
    };
  }, [onClose]);

  const onClickBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={onClickBackdrop}>
      <Modal>
        <LargeImg src={largeImg} alt="" />
      </Modal>
    </Overlay>,
    modalRoot
  );
};

ModalWindow.propTypes = {
  largeImg: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
