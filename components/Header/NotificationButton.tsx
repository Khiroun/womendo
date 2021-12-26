import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Block, theme, Text } from "galio-framework";
import materialTheme from "../../constants/Theme";
import Icon from "../Icon";

type Props = {
  style?: StyleProp<ViewStyle>;
  isWhite?: boolean;
  onPress: () => void;
  notificationCount?: number;
};
const NotificationsButton: React.FC<Props> = ({
  isWhite,
  style,
  onPress,
  notificationCount,
}) => {
  const renderNotificationsCount = () => {
    if (notificationCount) {
      return (
        <Block middle center style={styles.notify}>
          <Text
            style={{
              color: "#fff",
              fontSize: 10,
            }}
          >
            {notificationCount}
          </Text>
        </Block>
      );
    }
  };
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Icon
        family="GalioExtra"
        size={16}
        name="basket-simple"
        color={theme.COLORS[isWhite ? "WHITE" : "ICON"]}
      />
      {renderNotificationsCount()}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: "relative",
  },
  notify: {
    backgroundColor: materialTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE,
    width: theme.SIZES.BASE,
    position: "absolute",
    top: 0,
    right: 0,
  },
});

export default NotificationsButton;
