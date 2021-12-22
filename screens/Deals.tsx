import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme } from "galio-framework";

import { Product } from "../components/";

import deals from "../constants/images/deals";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/Screens";

const { width } = Dimensions.get("screen");

type Props = StackScreenProps<RootStackParamList, "Deals">;

export default class Deals extends React.Component<Props> {
  renderProducts = () => {
    const { route } = this.props;
    const tabId = route.params?.tabId;
    const products = tabId ? deals[tabId] : deals.popular;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}
      >
        <Block flex>
          <Product
            product={products[0]}
            horizontal
            goToProduct={() =>
              this.props.navigation.navigate("Product", {
                product: products[0],
              })
            }
          />
          <Block flex row>
            <Product
              product={products[1]}
              style={{ marginRight: theme.SIZES.BASE }}
              goToProduct={() =>
                this.props.navigation.navigate("Product", {
                  product: products[1],
                })
              }
            />
            <Product
              product={products[2]}
              goToProduct={() =>
                this.props.navigation.navigate("Product", {
                  product: products[2],
                })
              }
            />
          </Block>
          <Product
            product={products[3]}
            horizontal
            goToProduct={() =>
              this.props.navigation.navigate("Product", {
                product: products[3],
              })
            }
          />
          <Product
            product={products[4]}
            full
            goToProduct={() =>
              this.props.navigation.navigate("Product", {
                product: products[1],
              })
            }
          />
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <Block flex center style={styles.deals}>
        {this.renderProducts()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  deals: {
    width: width,
  },
  products: {
    justifyContent: "center",
    marginTop: theme.SIZES.BASE * 2,
  },
});
