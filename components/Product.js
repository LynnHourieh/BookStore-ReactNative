import React from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";

export  function Product({item,navigation}) {
//console.log(item.image)
const onPressfunction=()=>{
   navigation.navigate('ProductDetails', {
          product: item
        });
      }


  return (
    <TouchableOpacity style={styles.card} onPress={onPressfunction}>
      <Image
        style={styles.thumb}
        source={{uri:`http://10.0.0.22:8081/public/images/${item.image}`}}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.title}</Text>
        <Text >{item.auther}</Text>
        <Text style={styles.price}>{item.price}$</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: "100%",
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
});
