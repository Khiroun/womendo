import { useState } from "react";
import createUserWithFormData from "../useCases/createUserWithFormData";

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

const useSignUpWithFormData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const isInvalid = ({ userName, email, password }) => {
    if (userName.length < 4) {
      return "Le nom d'utilisateur doit contenir plus de 3 caractères";
    }
    if (password.length < 6) {
      return "Le mot de passe doit contenir plus de 5 caractères";
    }
    if (!ValidateEmail(email)) {
      return "Adresse email invalide";
    }
  };
  const signUp = async ({ userName, email, password }) => {
    let errorMessage = isInvalid({ userName, email, password });
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await createUserWithFormData({ userName, email, password });
    } catch (error) {
      errorMessage = error.message;
      if (errorMessage.includes("email-already-in-use")) {
        errorMessage = "Cette adresse email est déja utilisée";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, result, signUp };
};

export default useSignUpWithFormData;
