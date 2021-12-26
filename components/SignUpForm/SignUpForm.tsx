import React, { useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";

import { Block, Button, Input, Text, theme } from "galio-framework";
const { width } = Dimensions.get("window");

import { materialTheme } from "../../constants/";
import useSignUpWithFormData from "../../hooks/useSignUpWithFormData";
import ErrorToast from "./ErrorToast";
type Props = {
  goToSignIn: () => void;
  goToMyAccount: () => void;
};
const SignUpForm: React.FC<Props> = ({ goToSignIn, goToMyAccount }) => {
  const [active, setActive] = useState({
    user: false,
    email: false,
    password: false,
  });
  const [state, setState] = useState({
    user: "",
    email: "",
    password: "",
  });
  const { loading, error, signUp } = useSignUpWithFormData();
  const toggleActive = (name) => {
    active[name] = !active[name];

    setActive({ ...active, [name]: !active[name] });
  };
  const handleChange = (name, value) => {
    setState({ ...state, [name]: value });
  };
  return (
    <Block
      flex={1}
      center
      space="between"
      style={{
        marginTop: 200,
      }}
    >
      {error ? <ErrorToast message={error} /> : null}
      <Block center>
        <Input
          bgColor="transparent"
          placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
          borderless
          color="white"
          placeholder="Pseudo"
          autoCapitalize="none"
          style={[styles.input, active.user ? styles.inputActive : null]}
          onChangeText={(text) => handleChange("user", text)}
          onBlur={() => toggleActive("user")}
          onFocus={() => toggleActive("user")}
        />
        <Input
          bgColor="transparent"
          placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
          borderless
          color="white"
          type="email-address"
          placeholder="Email"
          autoCapitalize="none"
          style={[styles.input, active.email ? styles.inputActive : null]}
          onChangeText={(text) => handleChange("email", text)}
          onBlur={() => toggleActive("email")}
          onFocus={() => toggleActive("email")}
        />
        <Input
          bgColor="transparent"
          placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
          borderless
          color="white"
          password
          viewPass
          placeholder="Mot de passe"
          iconColor="white"
          style={[styles.input, active.password ? styles.inputActive : null]}
          onChangeText={(text) => handleChange("password", text)}
          onBlur={() => toggleActive("password")}
          onFocus={() => toggleActive("password")}
        />
      </Block>
      <Block flex center style={{ marginTop: 20 }}>
        <Button
          size="large"
          shadowless
          style={{ height: 48 }}
          color={materialTheme.COLORS.BUTTON_COLOR}
          disabled={loading}
          onPress={() => {
            signUp({
              userName: state.user,
              password: state.password,
              email: state.email,
            }).then(() => {
              !error && goToMyAccount();
            });
          }}
        >
          {loading ? <ActivityIndicator size={16} color="#fff" /> : "VALIDER"}
        </Button>
        <Button
          size="large"
          color="transparent"
          shadowless
          onPress={goToSignIn}
        >
          <Text
            center
            color={theme.COLORS.WHITE}
            size={theme.SIZES.FONT * 0.75}
          >
            Vous avez déjà un compte? S'identifier
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  input: {
    width: width * 0.9,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputActive: {
    borderBottomColor: "white",
  },
});

export default SignUpForm;
