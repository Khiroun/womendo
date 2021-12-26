import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ScrollViewBase,
} from "react-native";
import { Block, theme } from "galio-framework";

import { Product } from "../components/";

const { width } = Dimensions.get("screen");
import homeImages from "../constants/images/woman";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/Screens";
import useGetCurrentCategoryName from "../hooks/useGetCurrentCategoryName";
type Props = StackScreenProps<RootStackParamList, "Home">;

const Home: React.FC<Props> = ({ navigation }) => {
  const currentCategory = useGetCurrentCategoryName();
  const products = homeImages;
  const renderProducts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}
      >
        <Block flex>
          {products.map((product, i) => {
            if (i % 4 === 0) {
              return (
                <Product
                  key={product.title}
                  product={product}
                  horizontal
                  goToProduct={() =>
                    navigation.navigate("Product", {
                      product: homeImages[0],
                    })
                  }
                />
              );
            }
            if (i % 4 === 1) {
              let secondProduct = null;
              if (i < homeImages.length - 1) {
                secondProduct = homeImages[i + 1];
              }
              if (secondProduct) {
                return (
                  <Block flex row key={product.title}>
                    <Product
                      product={product}
                      style={{ marginRight: theme.SIZES.BASE }}
                      goToProduct={() =>
                        navigation.navigate("Product", {
                          product: product,
                        })
                      }
                    />
                    <Product
                      product={secondProduct}
                      goToProduct={() =>
                        navigation.navigate("Product", {
                          product: homeImages[2],
                        })
                      }
                    />
                  </Block>
                );
              } else {
                return (
                  <Product
                    product={product}
                    full
                    key={product.title}
                    goToProduct={() =>
                      navigation.navigate("Product", {
                        product: homeImages[4],
                      })
                    }
                  />
                );
              }
            }
            if (i % 4 === 3) {
              return (
                <Product
                  product={product}
                  full
                  key={product.title}
                  goToProduct={() =>
                    navigation.navigate("Product", {
                      product: homeImages[4],
                    })
                  }
                />
              );
            }
          })}
        </Block>
      </ScrollView>
    );
  };

  return (
    <Block flex center style={styles.home}>
      {renderProducts()}
    </Block>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
