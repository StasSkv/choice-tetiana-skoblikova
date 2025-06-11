import { FaHeart } from 'react-icons/fa';
import s from './LikeButton.module.css';
import { useDispatch } from 'react-redux';
import {
  addProductToFavorites,
  removeProductFromFavorites,
} from '../../../redux/favoritesSlice/favoritesSlice.js';
import { toast } from 'react-toastify';

export const LikeButton = ({ isLoved, productData }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.stopPropagation();
    if (isLoved) {
      dispatch(removeProductFromFavorites(productData.id));
      toast.warning('Товар видалено з улюблених');
    } else {
      dispatch(addProductToFavorites(productData));
      toast.success('Товар додано до улюблених');
    }
  };

  return (
    <button className={`${s.myLove} ${isLoved ? s.myLoveActive : ''}`} onClick={handleClick}>
      <FaHeart />
    </button>
  );
};
