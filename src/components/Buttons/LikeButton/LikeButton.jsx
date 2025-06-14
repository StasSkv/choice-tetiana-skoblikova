import { useDispatch } from 'react-redux';
import {
  addProductToFavorites,
  removeProductFromFavorites,
} from '../../../redux/favoritesSlice/favoritesSlice.js';
import { toast } from 'react-toastify';
import s from './LikeButton.module.css';
import { FaHeart } from 'react-icons/fa';

export const LikeButton = ({ isLoved, id }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.stopPropagation();
    if (isLoved) {
      dispatch(removeProductFromFavorites(id));
      toast.warning('Товар видалено з улюблених');
    } else {
      dispatch(addProductToFavorites(id));
      toast.success('Товар додано до улюблених');
    }
  };

  return (
    <button className={`${s.myLove} ${isLoved ? s.myLoveActive : ''}`} onClick={handleClick}>
      <FaHeart />
    </button>
  );
};
