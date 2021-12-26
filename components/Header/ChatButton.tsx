import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Block, theme, Text } from "galio-framework";
import materialTheme from "../../constants/Theme";

import Icon from "../Icon";

type Props = {
  isWhite?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  chatCount?: number;
};
const ChatButton: React.FC<Props> = ({
  isWhite,
  style,
  onPress,
  chatCount,
}) => {
  const renderChatCount = () => {
    if (chatCount) {
      return (
        <Block middle center style={styles.notify}>
          <Text
            style={{
              color: "#fff",
              fontSize: 10,
            }}
          >
            {chatCount}
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
        name="chat-33"
        color={theme.COLORS[isWhite ? "WHITE" : "ICON"]}
      />
      {renderChatCount()}
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

export default ChatButton;
