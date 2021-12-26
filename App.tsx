import React from "react";
import { Platform, StatusBar, Image } from "react-native";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";

import { enableScreens } from "react-native-screens";
enableScreens();

import { Images, materialTheme } from "./constants/";
import { AppProvider } from "./AppContext/AppContext";
import Main from "./Main";

const assetImages = [
  Images.Profile,
  Images.Avatar,
  Images.Onboarding,
  Images.Products.Auto,
  Images.Products.Motocycle,
  Images.Products.Watches,
  Images.Products.Makeup,
  Images.Products.Accessories,
  Images.Products.Fragrance,
  Images.Products.BMW,
  Images.Products.Mustang,
  Images.Products["Harley-Davidson"],
];

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

type Params = {
  skipLoadingScreen?: boolean;
};

export default class App extends React.Component<Params> {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <AppProvider>
          <NavigationContainer>
            <GalioProvider theme={materialTheme}>
              <Block flex>
                {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                <Main />
              </Block>
            </GalioProvider>
          </NavigationContainer>
        </AppProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    await Promise.all([...cacheImages(assetImages)]);
  };

  _handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
