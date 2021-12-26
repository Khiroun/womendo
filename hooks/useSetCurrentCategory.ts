import { useContext } from "react";
import { AppContext } from "../AppContext/AppContext";

const useSetCurrentCategory = (currentCategory: string) => {
  const { dispatch } = useContext(AppContext);
  dispatch({
    type: "SET_CURRENT_CATEGORY",
    currentCategory: currentCategory,
  });
};
export default useSetCurrentCategory;
