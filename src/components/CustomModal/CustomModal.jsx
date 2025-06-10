import React from 'react';
import Modal from 'react-modal';
import s from './CustomModal.module.css';
import { TfiClose } from 'react-icons/tfi';

const CustomModal = ({ isOpen, onClose, children }) => {
  return (
      <Modal isOpen={isOpen}
          overlayClassName={s.overlay}
          className={s.content}
          ariaHideApp={false}
          closeTimeoutMS={400}
          onRequestClose={()=>onClose()}
          
      
      >
      <button className={s.closeBtn} onClick={() => onClose()}>
        <TfiClose />
      </button>

      {children}

      <button className={s.submitBtn} onClick={() => onClose()}>
        Відправити замолення
      </button>
    </Modal>
  );
};

export default CustomModal;
