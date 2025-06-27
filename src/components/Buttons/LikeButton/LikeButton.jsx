import { useDispatch } from 'react-redux';
import {
  addProductToFavoritesLocal,
  removeProductFromFavoritesLocal,
} from '../../../redux/favoritesSlice/favoritesSlice.js';
import {
  removeProductFromFavorites,
  addProductToFavorites,
} from '../../../redux/favoritesSlice/favoritesOperations.js';
import { toast } from 'react-toastify';
import s from './LikeButton.module.css';
import { FaHeart } from 'react-icons/fa';

export const LikeButton = ({ isLoved, id }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.stopPropagation();
    if (isLoved) {
      dispatch(removeProductFromFavoritesLocal(id));
      dispatch(removeProductFromFavorites(id));
      toast.warning('Товар видалено з улюблених');
    } else {
      dispatch(addProductToFavoritesLocal(id));
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
