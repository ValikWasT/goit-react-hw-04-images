import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, Modal, LargeImg } from './ModalStyled';
const modalRoot = document.querySelector('#modal-root');
export class ModalWindow extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onClickBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.onClickBackdrop}>
        <Modal>
          <LargeImg src={this.props.largeImg} alt="" />
        </Modal>
      </Overlay>,
      modalRoot
    );
  }
}

ModalWindow.propTypes = {
  largeImg: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
