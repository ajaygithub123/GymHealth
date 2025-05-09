import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';

type Props = {
  route: {
    params: {
      totalAmount: number;
      cartItems: {
        id: number;
        title: string;
        price: number;
        quantity: number;
      }[];
    };
  };
  navigation: any;
};

const CheckoutScreen = ({ route, navigation }: Props) => {
  const { totalAmount, cartItems } = route.params;

  const handlePlaceOrder = () => {
    Alert.alert('Order Placed', 'Your order has been placed successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('HomeScreen'), // Navigate back to HomeScreen
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      {/* Cart Items Summary */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDetails}>
              ${item.price} x {item.quantity} = ${item.price * item.quantity}
            </Text>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total Amount: ${totalAmount}</Text>
            <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
              <Text style={styles.placeOrderButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  footer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  placeOrderButton: {
    backgroundColor: '#5cb85c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CheckoutScreen;

/*import {View, Text} from 'react-native';
import React from 'react';

type Props = {};

const CheckoutScreen = (props: Props) => {
  return (
    <View>
      <Text>CheckoutScreen</Text>
    </View>
  );
};

export default CheckoutScreen;*/
