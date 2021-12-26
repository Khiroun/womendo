import { useContext } from "react";
import { AppContext } from "../AppContext/AppContext";
import User from "../entities/User";

type useGetUserType = () => null | User;
const useGetUser: useGetUserType = () => {
  const { state } = useContext(AppContext);
  return state.user;
};
export default useGetUser;
