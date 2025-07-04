import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import s from './CustomModal.module.css';
import { TfiClose } from 'react-icons/tfi';
import { GoArrowLeft } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartProducts } from '../../redux/cartSlice/cartSelectors.js';
import clsx from 'clsx';

const CustomModal = ({
  isOpen,
  onClose,
  children,
  isCart = true,
  overlayClassName = '',
  contentClassName = '',
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const productsInCart = useSelector(selectCartProducts);

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

  const overlayClasses = clsx(s.overlay, modalActive && s.overlayActive, overlayClassName);
  const contentClasses = clsx(s.content, modalActive && s.contentActive, contentClassName);

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
      {isCart && (
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
                {productsInCart.length > 0
                  ? productsInCart.reduce(
                      (acc, product) => acc + product.price * product.quantity,
                      0
                    )
                  : (0).toLocaleString('uk-UA', {
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
      )}
    </Modal>
  );
};

export default CustomModal;
