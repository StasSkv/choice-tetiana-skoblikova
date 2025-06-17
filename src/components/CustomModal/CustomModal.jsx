import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import s from './CustomModal.module.css';
import { TfiClose } from 'react-icons/tfi';
import { GoArrowLeft } from 'react-icons/go';
import { NavLink } from 'react-router-dom';

const CustomModal = ({ isOpen, onClose, order, children }) => {
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
      document.body.style.overflow = 'hidden';
    } else {
      setModalActive(false);
      closeTimeout = setTimeout(() => {
        setModalVisible(false);
      }, 400);
      document.body.style.overflow = '';
    }

    return () => {
      clearTimeout(openTimeout);
      clearTimeout(closeTimeout);
      document.body.style.overflow = '';
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
      <div className={s.optionsWrap}>
        <button className={s.goBack} onClick={onClose}>
          <span>
            <GoArrowLeft />
          </span>
          Продовжити покупки
        </button>
        {order && (
          <div className={s.orderWrap}>
            <p className={s.orderText}>Сумма замовлення</p>
            <p className={s.orderSum}>
              {order}
              <span className={s.orderCurrency}> грн</span>
            </p>
          </div>
        )}
        <NavLink to="placing" className={s.submitBtn}>Оформити замовлення</NavLink>
      </div>
    </Modal>
  );
};

export default CustomModal;
