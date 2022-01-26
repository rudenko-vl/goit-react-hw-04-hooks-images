import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from "./Modal.styled";
const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
    componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    };

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    };
    
    handleKeyDown = (ev) => {
    if (ev.code === "Escape") {
      this.props.toggleModal(ev);
    }
  };

  handleClickOverlay = (ev) => {
    if (ev.currentTarget === ev.target) {
      this.props.toggleModal(ev);
    }
    };
    
    render() {
        return createPortal(
            <Overlay onClick={this.handleClickOverlay}>
                <ModalWindow>
                    {this.props.children}
                </ModalWindow>
            </Overlay>, modalRoot
        );
    };
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal;