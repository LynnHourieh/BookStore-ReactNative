// App.js
import "react-native-gesture-handler";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { CartIcon } from "./components/CartIcon";
import Login from "./app/Login";
import { View, Text } from "react-native";
import ProductList from "./screens/ProductList";
import ProductDetails from "./screens/ProductDetails";
import { Store, StoreProvider } from "./Store";
import { Cart } from "./screens/Cart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
const Stack = createStackNavigator();
const App = () => {
     const [userInfo, setUserInfo] = useState("");
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const storedUserInfo = await AsyncStorage.getItem("userInfo");
          if (storedUserInfo) {
            const parsedUserInfo = JSON.parse(storedUserInfo);
            setUserInfo(parsedUserInfo);
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };

      fetchUserInfo();
    }, []);
 

  const removeUserInfo = async (navigation) => {
    try {
      await AsyncStorage.removeItem("userInfo");

      console.log("userInfo removed from AsyncStorage");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error removing userInfo:", error);
    }
  };
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Products"
            component={ProductList}
            options={({ navigation }) => ({
              title: "Online BookStore", //title of the screen
              headerTitleStyle: styles.headerTitle, //style of the title
              headerRight: () => (
                <View style={{ flexDirection: "row", marginRight: 10 }}>
                  {userInfo ? (
                    <Text
                      style={styles.container}
                      onPress={() => {
                        removeUserInfo(navigation);
                      }}
                    >
                      LogOut
                    </Text>
                  ) : (
                    <Text
                      style={styles.container}
                      onPress={() => {
                        navigation.navigate("Login");
                      }}
                    >
                      Login
                    </Text>
                  )}
                  <CartIcon navigation={navigation} />
                </View>
              ), //adding a cart button to the right of navigation bar
            })}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={({ navigation }) => ({
              title: "Product details",
              headerTitleStyle: styles.headerTitle,
              headerRight: () => (
                <View style={{ flexDirection: "row", marginRight: 10 }}>
                  {userInfo ? (
                    <Text
                      style={styles.container}
                      onPress={() => {
                        removeUserInfo(navigation);
                      }}
                    >
                      LogOut
                    </Text>
                  ) : (
                    <Text
                      style={styles.container}
                      onPress={() => {
                        navigation.navigate("Login");
                      }}
                    >
                      Login
                    </Text>
                  )}
                  <CartIcon navigation={navigation} />
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={({ navigation }) => ({
              title: "My Cart",
              headerTitleStyle: styles.headerTitle,
            
            })}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={({ navigation }) => ({
              title: "Login",
              headerTitleStyle: styles.headerTitle,
              headerRight: () => (
                <View style={{ flexDirection: "row", marginRight: 10 }}>
                  <CartIcon navigation={navigation} />
                </View>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};
const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
  },
  container: {
    marginHorizontal: 8,
    backgroundColor: "#007bff",
    height: 32,
    padding: 6,
    borderRadius: 32 / 2,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default App;
