import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, Modal, LargeImg } from './ModalStyled';
const modalRoot = document.querySelector('#modal-root');
export const ModalWindow = ({ largeImg, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        onClose();
      }
    });

    return () => {
      window.removeEventListener('keydown', e => {
        if (e.code === 'Escape') {
          onClose();
        }
      });
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
