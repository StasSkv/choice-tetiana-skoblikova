import { BsCart4 } from 'react-icons/bs';
import s from './CartLink.module.css';
import CustomModal from '../../../CustomModal/CustomModal.jsx';
import { useState } from 'react';
import img from '../../../../assets/images/product.png';

export const CartLink = ({ count, totalSum, animate }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  console.log(modalIsOpen);
  
  return (
    <>
      <button className={s.navLinkCart} onClick={()=>{setModalIsOpen(true)}}>
        <div className={s.totalSumWrap}>
          {count > 0 && (
            <span className={`${s.counter} ${s.counterShow} ${animate ? s.bounce : ''}`}>
              {count} <span className={s.currency}>x</span>
            </span>
          )}
          <p className={s.totalSum}>
            {totalSum} <span className={s.currency}>грн</span>
          </p>
        </div>
        <BsCart4 className={s.cart} />
      </button>

      <CustomModal
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}
      >
        <h2>здрасте</h2>
        <img src={img} alt="" />
      </CustomModal>
    </>
  );
};
