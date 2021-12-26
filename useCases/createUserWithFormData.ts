import { createUserWithEmailAndPassword, setDoc } from "../frameworks/firebase";

const createUserWithFormData = async ({ userName, email, password }) => {
  const userCredentials = await createUserWithEmailAndPassword(email, password);
  await setDoc("users", userCredentials.user.uid, {
    userName,
    email,
  });
};
export default createUserWithFormData;
