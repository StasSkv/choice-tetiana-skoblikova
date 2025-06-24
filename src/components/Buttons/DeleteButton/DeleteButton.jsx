import { MdDelete } from 'react-icons/md';
import s from './DeleteButton.module.css';
import { useDispatch } from 'react-redux';
import { removeProductFromFavorites } from '../../../redux/favoritesSlice/favoritesSlice.js';
import { toast } from 'react-toastify';

const DeleteButton = ({ id, onStartRemove }) => {
  const dispatch = useDispatch();

  const handleRemove = (e) => {
    e.stopPropagation();
    onStartRemove();
    setTimeout(() => {
      dispatch(removeProductFromFavorites(id));
    }, 300);
    toast.warning('Товар видалено з улюблених');
  };

  return (
    <button className={s.deleteBtn} onClick={handleRemove}>
      <MdDelete />
    </button>
  );
};

export default DeleteButton;