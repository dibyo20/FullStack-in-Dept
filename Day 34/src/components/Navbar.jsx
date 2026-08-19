import { useDispatch, useSelector } from "react-redux";
import {
  changeThemeToDark,
  changeThemeToLight,
  changeThemeToRed,
} from "../redux/slices/themeSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.value);

  return (
    <>
      <h1>{theme}</h1>
      <button onClick={() => dispatch(changeThemeToDark())}>Dark</button>
      <button onClick={() => dispatch(changeThemeToLight())}>Light</button>
      <button onClick={() => dispatch(changeThemeToRed())}>Red</button>
    </>
  );
};

export default Navbar;
