import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Store } from "../Store";



export function CartIcon({ navigation }) {
 const{getItemsCount}=useContext(Store)
  return (
    <View style={styles.container}>
      <Text
        style={styles.text}
        onPress={() => {
          navigation.navigate("Cart");
        }}
      >
        Cart({getItemsCount()})
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    backgroundColor: "#007bff",
    height: 32,
    padding: 6,
    borderRadius: 32 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
