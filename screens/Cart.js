import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { Store } from "../Store";

export function Cart({ navigation }) {
  const { items, getTotalPrice } = useContext(Store);

  function Totals() {
    const [total, setTotal] = useState(0);
    const[userInfo,setUserInfo]=useState("");
    
    useEffect(() => {
     
      setTotal(getTotalPrice());
    },[total]);

    return (
      <View>
        <View style={styles.cartLineTotal}>
          <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
          <Text style={styles.lineRight}>$ {total}</Text>
        </View>
        {/* {userInfo ? <Button title="Checkout" /> : <Button disabled title="Checkout" />} */}
      </View>
    );
  }

  function renderItem({ item }) {
    return (
      <View style={styles.cartLine}>
        <Text style={styles.lineLeft}>
          {item.product.title} x {item.qty}
        </Text>
        <Text style={styles.lineRight}>$ {item.totalPrice}</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.itemsList}
      contentContainerStyle={styles.itemsListContainer}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.product._id}
      ListFooterComponent={Totals}
    />
  );
}

const styles = StyleSheet.create({
  cartLine: {
    flexDirection: "row",
  },
  cartLineTotal: {
    flexDirection: "row",
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
  },
  lineTotal: {
    fontWeight: "bold",
  },

  lineLeft: {
    fontSize: 20,
    lineHeight: 40,
    color: "#333333",
  },
  lineRight: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 40,
    color: "#333333",
    textAlign: "right",
  },
  itemsList: {
    backgroundColor: "#eeeeee",
  },
  itemsListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
