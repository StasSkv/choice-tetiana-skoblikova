import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import s from './CustomModal.module.css';
import { TfiClose } from 'react-icons/tfi';
import { GoArrowLeft } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProductsInCart } from '../../redux/cartSlice/cartSelectors.js';

const CustomModal = ({ isOpen, onClose, children }) => {
  const productsInCart = useSelector(selectProductsInCart);
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
        {productsInCart.length > 0 && (
          <div className={s.orderWrap}>
            <p className={s.orderText}>Сумма замовлення</p>
            <p className={s.orderSum}>
              {productsInCart
                .reduce((acc, product) => acc + product.price * product.quantity, 0)
                .toLocaleString('uk-UA', {
                  style: 'currency',
                  currency: 'UAH',
                })}
              <span className={s.orderCurrency}> грн</span>
            </p>
          </div>
        )}
        {productsInCart.length > 0 && (
          <NavLink to="/placing" className={s.submitBtn} onClick={onClose}>
            Оформити замовлення
          </NavLink>
        )}
      </div>
    </Modal>
  );
};

export default CustomModal;
