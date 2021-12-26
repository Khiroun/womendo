import React, { useEffect } from "react";
import { Alert, StyleSheet, Platform } from "react-native";

import { Block, Button, theme } from "galio-framework";

import { LinearGradient } from "expo-linear-gradient";
import { HeaderHeight } from "../constants/utils";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerParamList } from "../navigation/Screens";
import SignUpForm from "../components/SignUpForm";
import useGetUser from "../hooks/useGetUser";

type Props = DrawerScreenProps<DrawerParamList, "Sign Up">;

const SignUp: React.FC<Props> = ({ navigation }) => {
  const user = useGetUser();
  useEffect(() => {
    if (user) {
      navigation.navigate("Home");
    }
  }, [user]);
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.25, y: 1.1 }}
      locations={[0.2, 1]}
      colors={["#6C24AA", "#15002B"]}
      style={[styles.signup, { flex: 1, paddingTop: theme.SIZES.BASE * 4 }]}
    >
      <Block flex middle>
        <SignUpForm
          goToSignIn={() => navigation.navigate("Sign In")}
          goToMyAccount={() => {
            navigation.navigate("Profile");
          }}
        />
        <Block
          row
          center
          space="between"
          style={{ marginVertical: theme.SIZES.BASE * 1.875 }}
        >
          <Block flex middle center>
            <Button
              iconSize={theme.SIZES.BASE * 1.625}
              icon="google"
              iconFamily="font-awesome"
              onPress={() => Alert.alert("Not implemented")}
              color="#dd4b39"
              shadowless
              iconColor={theme.COLORS.WHITE}
              style={styles.social}
            >
              Continuer avec Google
            </Button>
          </Block>
        </Block>
      </Block>
    </LinearGradient>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  signup: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  },
  social: {
    width: "100%",
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
});
