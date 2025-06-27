import { MdDelete } from 'react-icons/md';
import s from './DeleteButton.module.css';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { removeProductFromFavoritesLocal } from '../../../redux/favoritesSlice/favoritesSlice.js';
import { removeProductFromFavorites } from '../../../redux/favoritesSlice/favoritesOperations.js';

const DeleteButton = ({ id, onStartRemove }) => {
  const dispatch = useDispatch();
  
  const handleRemove = (e) => {
    e.stopPropagation();
    onStartRemove();
    setTimeout(() => {
      dispatch(removeProductFromFavorites(id));
    }, 300);
    dispatch(removeProductFromFavoritesLocal(id));
    toast.warning('Товар видалено з улюблених');
  };

  return (
    <button className={s.deleteBtn} onClick={handleRemove}>
      <MdDelete />
    </button>
  );
};

export default DeleteButton;