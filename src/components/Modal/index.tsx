// Core dependencies
import React from 'react';

// Interfaces
import ModalProps from './interfaces/props';

// Constants
import { ENTER } from '../../constants/keys';

/**
 * Modal to display content
 * @param props Properties
 * @returns React component
 */
const Modal = (props:ModalProps) => {
  const { children, onClose } = props;

  /**
   * Closes the modal when the background is focused and enter is pressed
   * @param event Event data
   */
  const onKeyPress = (event:{key:string}) => {
    if (event.key === ENTER && onClose) { onClose(); }
  };
  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <div className="modal-buttons">
          <div className="close" onClick={onClose} role="button" tabIndex={0} onKeyPress={onKeyPress}>X</div>
        </div>
        <div className="body">
          {children}
        </div>
      </div>
    </div>
  );
};
export default Modal;
