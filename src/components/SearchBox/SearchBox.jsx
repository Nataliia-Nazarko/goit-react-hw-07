import css from "./SearchBox.module.css";
import { FcSearch } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchText = useSelector(selectNameFilter);

  const onSearch = (e) => {
    const { value } = e.target;
    dispatch(changeFilter(value.trim().toLowerCase()));
  };

  return (
    <label className={css.searchBox}>
      <span>Find contacts by name</span>
      <input
        className={css.searchInput}
        type="text"
        name="text"
        value={searchText}
        onChange={onSearch}
      />
      <span className={css.icon}>
        <FcSearch />
      </span>
    </label>
  );
};

export default SearchBox;
