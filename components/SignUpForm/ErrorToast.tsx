import React, { useState } from "react";
import { Toast, Block, Text, theme } from "galio-framework";
import { TouchableOpacity } from "react-native";
type Props = {
  message: string;
};
const ErrorToast: React.FC<Props> = ({ message }) => {
  const [isShow, setIsShow] = useState(true);
  return (
    <Block
      style={{
        backgroundColor: theme.COLORS.WARNING,
        width: 300,
        padding: 8,
        borderRadius: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          color: "#fff",
        }}
      >
        {message}
      </Text>
    </Block>
  );
};

export default ErrorToast;
