import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import s from './CustomModal.module.css';
import { TfiClose } from 'react-icons/tfi';

const CustomModal = ({ isOpen, onClose, submitBtn, children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    let openTimeout;
    let closeTimeout;

    if (isOpen) {
      setModalVisible(true);
      openTimeout = setTimeout(() => {
        setModalActive(true);
      }, 50);
    } else {
      setModalActive(false);
      closeTimeout = setTimeout(() => {
        setModalVisible(false);
      }, 400);
    }

    return () => {
      clearTimeout(openTimeout);
      clearTimeout(closeTimeout);
    };
  }, [isOpen]);

  if (!modalVisible) {
    return null;
  }

  const overlayClasses = `${s.overlay} ${modalActive ? s.overlayActive : ''}`;
  const contentClasses = `${s.content} ${modalActive ? s.contentActive : ''}`;

  return (
    <Modal
      isOpen={modalVisible}
      onRequestClose={onClose}
      overlayClassName={overlayClasses}
      className={contentClasses}
      ariaHideApp={false}
    >
      <button className={s.closeBtn} onClick={onClose}>
        <TfiClose />
      </button>
      {children}
      {submitBtn && (
        <button className={s.submitBtn} onClick={onClose}>
          {submitBtn}
        </button>
      )}
    </Modal>
  );
};

export default CustomModal;
