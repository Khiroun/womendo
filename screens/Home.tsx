import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";

import { Icon, Product } from "../components/";

const { width } = Dimensions.get("screen");
import homeImages from "../constants/images/home";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/Screens";
type Props = StackScreenProps<RootStackParamList, "Home">;

export default class Home extends React.Component<Props> {
  renderSearch = () => {
    const { navigation } = this.props;
    const iconContent = (
      <Icon
        size={16}
        color={theme.COLORS.MUTED}
        name="zoom-in"
        family="material"
      />
    );

    return (
      <Input
        right
        color="black"
        style={styles.search}
        iconContent={iconContent}
        placeholder="What are you looking for?"
        onFocus={() => navigation.navigate("Search")}
      />
    );
  };

  renderTabs = () => {
    const { navigation } = this.props;

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
              Categories
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
              Best Deals
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };

  renderProducts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}
      >
        <Block flex>
          <Product
            product={homeImages[0]}
            horizontal
            goToProduct={() =>
              this.props.navigation.navigate("Product", {
                product: homeImages[0],
              })
            }
          />
          <Block flex row>
            <Product
              product={homeImages[1]}
              style={{ marginRight: theme.SIZES.BASE }}
              goToProduct={() =>
                this.props.navigation.navigate("Product", {
                  product: homeImages[1],
                })
              }
            />
            <Product
              product={homeImages[2]}
              goToProduct={() =>
                this.props.navigation.navigate("Product", {
                  product: homeImages[2],
                })
              }
            />
          </Block>
          <Product
            product={homeImages[3]}
            horizontal
            goToProduct={() =>
              this.props.navigation.navigate("Product", {
                product: homeImages[3],
              })
            }
          />
          <Product
            product={homeImages[4]}
            full
            goToProduct={() =>
              this.props.navigation.navigate("Product", {
                product: homeImages[4],
              })
            }
          />
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderProducts()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
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
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
