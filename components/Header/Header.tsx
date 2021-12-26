import React, { useContext } from "react";
import { StyleSheet, Platform, Dimensions, Keyboard } from "react-native";
import { Button, Block, NavBar, Input, Text, theme } from "galio-framework";
import Icon from "../Icon";
import Tabs from "../Tabs";
import NavigationProp from "../../navigation/NavigationProp";
import ChatButton from "./ChatButton";
import NotificationsButton from "./NotificationButton";
import useGetUser from "../../hooks/useGetUser";
import useGetChatCount from "../../hooks/useGetChatCount";
import useGetNotificationsCount from "../../hooks/useGetNotificationsCount";
import useSetCurrentCategory from "../../hooks/useSetCurrentCategory";
import { AppContext } from "../../AppContext/AppContext";

const { height, width } = Dimensions.get("window");
const iPhoneX = () =>
  Platform.OS === "ios" &&
  (height === 812 || width === 812 || height === 896 || width === 896);

type Props = {
  back?: boolean;
  navigation: NavigationProp;
  white?: boolean;
  title?: string;
  optionLeft?: string;
  optionRight?: string;
  tabs?: { id: string }[];
  tabIndex?: number | string;
  transparent?: boolean;
  search?: boolean;
  options?: boolean;
};

const Header: React.FC<Props> = ({
  back,
  navigation,
  optionLeft,
  optionRight,
  options,
  search,
  tabIndex,
  tabs,
  title,
  transparent,
  white,
}) => {
  const noShadow = ["Search", "Profile"].includes(title);
  const headerStyles = [
    !noShadow ? styles.shadow : null,
    transparent ? { backgroundColor: "rgba(0,0,0,0)" } : null,
  ];
  const user = useGetUser();
  const chatCount = useGetChatCount();
  const notificationsCount = useGetNotificationsCount();
  const { dispatch } = useContext(AppContext);

  const renderRight = () => {
    if (!user) return null;
    return [
      <ChatButton
        key="chat-search"
        onPress={() => {
          navigation.navigate("Chat");
        }}
        isWhite={white}
        chatCount={chatCount}
      />,
      <NotificationsButton
        key="basket-search"
        onPress={() => navigation.navigate("Cart")}
        isWhite={white}
        notificationCount={notificationsCount}
      />,
    ];
  };
  const handleLeftPress = () => {
    if (back) navigation.goBack();
    else navigation.openDrawer();
  };
  const renderHeader = () => {
    if (search || tabs || options) {
      return (
        <Block center>
          {search ? renderSearch() : null}
          {options ? renderOptions() : null}
          {tabs ? renderTabs() : null}
        </Block>
      );
    }
    return null;
  };
  const renderSearch = () => {
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="What are you looking for?"
        onFocus={() => {
          Keyboard.dismiss();
          navigation.navigate("Search");
        }}
        iconContent={
          <Icon
            size={16}
            color={theme.COLORS.MUTED}
            name="magnifying-glass"
            family="entypo"
          />
        }
      />
    );
  };

  const renderOptions = () => {
    return (
      <Block row style={styles.tabs}>
        <Button
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() => navigation.navigate("Categories")}
        >
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>
              {optionLeft || "Categories"}
            </Text>
          </Block>
        </Button>
        <Button
          shadowless
          style={styles.tab}
          onPress={() => navigation.navigate("Deals")}
        >
          <Block row middle>
            <Icon
              size={16}
              name="camera-18"
              family="GalioExtra"
              style={{ paddingRight: 8 }}
            />
            <Text size={16} style={styles.tabTitle}>
              {optionRight || "Best Deals"}
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };

  const renderTabs = () => {
    const defaultTab = tabs && tabs[0] && tabs[0].id;

    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={(id) => {
          dispatch({
            type: "SET_CURRENT_CATEGORY",
            currentCategory: id,
          });
        }}
      />
    );
  };

  return (
    <Block style={headerStyles}>
      <NavBar
        back={back}
        title={title}
        style={styles.navbar}
        transparent={transparent}
        right={renderRight()}
        rightStyle={{ alignItems: "center" }}
        leftStyle={{ paddingTop: 3, flex: 0.3 }}
        leftIconName={back ? null : "navicon"}
        // leftIconFamily="font-awesome"
        leftIconColor={white ? theme.COLORS.WHITE : theme.COLORS.ICON}
        titleStyle={[
          styles.title,
          { color: theme.COLORS[white ? "WHITE" : "ICON"] },
        ]}
        onLeftPress={handleLeftPress}
      />
      {renderHeader()}
    </Block>
  );
};

export default Header;

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: "relative",
  },
  title: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300",
  },
});
