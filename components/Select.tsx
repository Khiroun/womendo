import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import { Block, Text, Icon, theme } from "galio-framework";

import { materialTheme } from "../constants/";

type Props = {
  onSelect?: (index: number, value: number) => void;
  style?: StyleProp<ViewStyle>;
  defaultIndex?: number;
  options: number[];
  disabled?: boolean;
};

export default class DropDown extends React.Component<Props> {
  state = {
    value: 1,
  };

  handleOnSelect = (index, value) => {
    const { onSelect } = this.props;

    this.setState({ value: value });
    onSelect && onSelect(index, value);
  };

  render() {
    const { onSelect, style, ...props } = this.props;
    return (
      <ModalDropdown
        style={[styles.qty, style]}
        onSelect={this.handleOnSelect}
        dropdownStyle={styles.dropdown}
        dropdownTextStyle={{ paddingLeft: theme.SIZES.BASE, fontSize: 12 }}
        {...props}
      >
        <Block flex row middle space="between">
          <Text size={12}>{this.state.value}</Text>
          <Icon name="angle-down" family="font-awesome" size={11} />
        </Block>
      </ModalDropdown>
    );
  }
}

const styles = StyleSheet.create({
  qty: {
    width: theme.SIZES.BASE * 6,
    backgroundColor: materialTheme.COLORS.DEFAULT,
    paddingHorizontal: theme.SIZES.BASE,
    paddingTop: 10,
    paddingBottom: 9.5,
    borderRadius: 3,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  dropdown: {
    marginTop: theme.SIZES.BASE / 2,
    marginLeft: -theme.SIZES.BASE,
    width: theme.SIZES.BASE * 6,
  },
});
