import React, { useContext, useEffect } from "react";
import { AppContext } from "./AppContext/AppContext";
import User from "./entities/User";
import { auth, getDoc } from "./frameworks/firebase";
import Screens from "./navigation/Screens";

const Main = () => {
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user && user.uid) {
        const dbUser = await getDoc("users", user.uid);
        const stateUser: User = {
          userName: dbUser.userName,
          email: dbUser.email,
          phoneNumber: dbUser.phoneNumber,
          bio: dbUser.bio,
          profileImage: dbUser.profileImage,
          rating: dbUser.rating,
        };
        dispatch({
          type: "SET_USER",
          user: stateUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return <Screens />;
};

export default Main;
