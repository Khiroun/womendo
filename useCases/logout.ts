import { signOut } from "../frameworks/firebase";

const logout = async () => {
  await signOut();
};
export default logout;
