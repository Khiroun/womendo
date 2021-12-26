import React from "react";
import { Image, StyleSheet, StatusBar, Dimensions } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import materialTheme from "../constants/Theme";
import { RootStackParamList } from "../navigation/Screens";
import appConfig from "../appConfig";

type Props = StackScreenProps<RootStackParamList, "Onboarding">;

export default class Onboarding extends React.Component<Props> {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex center>
          <Image
            source={appConfig.onBoarding.image}
            style={{ width, zIndex: 1 }}
          />
        </Block>
        <Block flex={1.3} space="between" style={styles.padded}>
          <Block style={{ paddingTop: 50, position: "relative" }}>
            <Block
              style={{
                marginBottom: theme.SIZES.BASE / 2,
                paddingHorizontal: theme.SIZES.BASE * 2,
                zIndex: 3,
              }}
            >
              <Block>
                <Text color="white" size={60}>
                  {appConfig.onBoarding.bigText1}
                </Text>
              </Block>
              <Block row>
                <Text color="white" size={60}>
                  {appConfig.onBoarding.bigText2}
                </Text>
                <Block middle style={styles.pro}>
                  <Text size={16} color="white">
                    {appConfig.onBoarding.smallText}
                  </Text>
                </Block>
              </Block>
            </Block>
            <Block
              style={{ paddingHorizontal: theme.SIZES.BASE * 2, zIndex: 3 }}
            >
              <Text size={16} color="rgba(255,255,255,0.6)">
                {appConfig.onBoarding.subHeader}
              </Text>
            </Block>
          </Block>
          <Block center style={{ paddingBottom: 30 }}>
            <Button
              shadowless
              style={styles.button}
              color={materialTheme.COLORS.BUTTON_COLOR}
              onPress={() => navigation.navigate("App")}
            >
              {appConfig.onBoarding.buttonText}
            </Button>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  padded: {
    // paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 8,
    marginLeft: 12,
    borderRadius: 2,
    height: 22,
  },
  gradient: {
    zIndex: 1,
    position: "absolute",
    top: 33 + theme.SIZES.BASE,
    left: 0,
    right: 0,
    height: 90,
  },
});
