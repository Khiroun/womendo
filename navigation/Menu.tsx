import React from "react";
import {
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon, Drawer as DrawerCustomItem, Button } from "../components/";
import { materialTheme } from "../constants/";
import NavigationProp from "./NavigationProp";
import useGetUser from "../hooks/useGetUser";
import { noImage } from "../constants/Images";
import appConfig from "../appConfig";
import useLogout from "../hooks/useLogout";

type Props = {
  drawerPosition?: "left" | "right";
  navigation?: NavigationProp;

  state?: {
    index?: number;
  };
};

const CustomDrawerContent: React.FC<Props> = ({
  drawerPosition,
  navigation,
  state,
}) => {
  const insets = useSafeAreaInsets();
  /*const screens = [
    "Home",
    "Woman",
    "Man",
    "Kids",
    "New Collection",
    "Profile",
    "Settings",
    "Components",
  ];*/
  const screens = [
    { name: "Home", title: "Accueil" },
    { name: "Woman", title: "Vêtements" },
    { name: "Man", title: "Beauté" },
    { name: "Kids", title: "Accessoires" },
    { name: "New Collection", title: "Sport" },
  ];
  const user = useGetUser();
  const { loading, logout } = useLogout();
  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.23} style={styles.header}>
        {user ? (
          <>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Profile")}
            >
              <Block style={styles.profile}>
                {user.profileImage ? (
                  <Image
                    source={{ uri: user.profileImage }}
                    style={styles.avatar}
                  />
                ) : (
                  <Image source={noImage} style={styles.avatar} />
                )}
                <Text h5 color={"white"}>
                  {user.userName}
                </Text>
              </Block>
            </TouchableWithoutFeedback>
            <Block row>
              <Text size={16} color={materialTheme.COLORS.WARNING}>
                {user.rating ? user.rating : 5}
                <Icon name="shape-star" family="GalioExtra" size={14} />
              </Text>
            </Block>
          </>
        ) : (
          <Block>
            <Button gradient onPress={() => navigation.navigate("Sign In")}>
              SE CONNECTER
            </Button>
          </Block>
        )}
      </Block>
      <Block flex style={{ paddingLeft: 7, paddingRight: 14 }}>
        <ScrollView
          contentContainerStyle={[
            {
              paddingTop: insets.top * 0.4,
              paddingLeft: drawerPosition === "left" ? insets.left : 0,
              paddingRight: drawerPosition === "right" ? insets.right : 0,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item.name}
                label={item.title}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
        </ScrollView>
      </Block>
      <Block flex={0.25} style={{ paddingLeft: 7, paddingRight: 14 }}>
        {user ? (
          <>
            <Button gradient disabled={loading} onPress={logout}>
              {loading ? (
                <ActivityIndicator size={25} color="#fff" />
              ) : (
                "SE DECONNECTER"
              )}
            </Button>
          </>
        ) : (
          <>
            <DrawerCustomItem
              title="Sign In"
              navigation={navigation}
              focused={state.index === 8 ? true : false}
              label="Se Connecter"
            />
            <DrawerCustomItem
              title="Sign Up"
              navigation={navigation}
              focused={state.index === 9 ? true : false}
              label="Créer un compte"
            />
          </>
        )}
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#4B1958",
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: "center",
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: "flex-end",
  },
  profile: {
    marginBottom: theme.SIZES.BASE / 2,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: 8,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: 16,
  },
});

export default CustomDrawerContent;
