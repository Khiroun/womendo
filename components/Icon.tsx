import React from "react";
import * as Font from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import { Icon } from "galio-framework";

import GalioConfig from "../assets/fonts/galioExtra.json";
import { StyleProp, TextStyle } from "react-native";
const GalioExtra = require("../assets/fonts/galioExtra.ttf");
const IconGalioExtra = createIconSetFromIcoMoon(
  GalioConfig,
  "GalioExtra",
  GalioExtra
);

type Props = {
  name?: string;
  family?: string;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
};

export default class IconExtra extends React.Component<Props> {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({ GalioExtra: GalioExtra });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { name, family, ...rest } = this.props;

    if (name && family && this.state.fontLoaded) {
      if (family === "GalioExtra") {
        return <IconGalioExtra name={name} family={family} {...rest} />;
      }
      return <Icon name={name} family={family} {...rest} />;
    }

    return null;
  }
}
