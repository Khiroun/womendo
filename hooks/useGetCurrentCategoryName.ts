import { useContext } from "react";
import { AppContext } from "../AppContext/AppContext";

const useGetCurrentCategoryName = () => {
  const { state } = useContext(AppContext);
  return state.currentCategory;
};
export default useGetCurrentCategoryName;
