import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import ProductItem from '../components/ProductItem';

const ProductListScreen = () => {
  // Static product data
  const products = [
    {
      id: 1,
      title: 'Sample Product 1',
      description: 'This is a description for Sample Product 1.',
      price: 100,
      priceBeforeDeal: 120,
      priceOff: '20%',
      stars: 4.5,
      numberOfReview: 120,
      image: ['https://placehold.co/600x400/000000/FFFFFF.png'],
    },
    {
      id: 2,
      title: 'Sample Product 2',
      description: 'This is a description for Sample Product 2.',
      price: 200,
      priceBeforeDeal: 250,
      priceOff: '20%',
      stars: 4.0,
      numberOfReview: 80,
      image: ['https://placehold.co/600x400/000000/FFFFFF.png'],
    },
    {
      id: 3,
      title: 'Sample Product 3',
      description: 'This is a description for Sample Product 3.',
      price: 300,
      priceBeforeDeal: 350,
      priceOff: '15%',
      stars: 4.8,
      numberOfReview: 200,
      image: ['https://placehold.co/600x400/000000/FFFFFF.png'],
    },
  ];

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleAddToCart = (productId: number) => {
    alert(`Product ${productId} added to cart!`);
  };

  const handleBuyNow = (productId: number) => {
    alert(`Proceeding to buy Product ${productId}!`);
  };

  const handleQuantityChange = (productId: number, increment: boolean) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + (increment ? 1 : -1)),
    }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            {/* Product Item */}
            <ProductItem
              image={item.image[0]}
              title={item.title}
              description={item.description}
              price={item.price}
              priceBeforeDeal={item.priceBeforeDeal}
              priceOff={item.priceOff}
              stars={item.stars}
              numberOfReview={item.numberOfReview}
              itemDetails={item}
            />

            {/* Quantity Selector */}
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(item.id, false)}>
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>
                {quantities[item.id] || 1}
              </Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(item.id, true)}>
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(item.id)}>
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buyNowButton}
                onPress={() => handleBuyNow(item.id)}>
                <Text style={styles.buttonText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  separator: {
    height: 10,
  },
  productContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#f0ad4e',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    alignItems: 'center',
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#d9534f',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductListScreen;
/* //with calling api
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import ProductItem from '../components/ProductItem';
import {ItemDetails} from '../constants/types';

const ProductListScreen = () => {
  const [products, setProducts] = useState<ItemDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product data
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://10.0.2.2:4000/api/products/');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem
            image={item.image[0]}
            title={item.title}
            description={item.description}
            price={item.price}
            priceBeforeDeal={item.priceBeforeDeal}
            priceOff={item.priceOff}
            stars={item.stars}
            numberOfReview={item.numberOfReview}
            itemDetails={item}
          />
        )}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};
export default ProductListScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  separator: {
    height: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
*/
