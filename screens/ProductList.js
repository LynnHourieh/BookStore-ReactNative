import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Product } from "../components/Product";
import { useContext } from "react";
import { Store } from "../Store";

function ProductList({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
console.log(data)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://10.0.0.22:5000/api/products"); // Replace with your API URL with localhost -> 10.0.0.22
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  //console.log(data);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Product item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item._id.toString()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default ProductList;
