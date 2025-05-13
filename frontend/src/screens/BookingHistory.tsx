import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const bookingData = [
  {id: '1', date: '2025-05-01', item: 'Laptop', price: 1200},
  {id: '2', date: '2025-05-05', item: 'Tablet', price: 300},
  {id: '3', date: '2äub025-05-10', item: 'Phone', price: 800},
];

const BookingItem = ({booking}) => (
  <View style={styles.bookingItem}>
    <Text style={styles.date}>{booking.date}</Text>
    <Text style={styles.item}>{booking.item}</Text>
    <Text style={styles.price}>${booking.price}</Text>
  </View>
);

const BookingHistory = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking History</Text>
      <FlatList
        data={bookingData}
        renderItem={({item}) => <BookingItem booking={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bookingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  date: {
    flex: 1,
  },
  item: {
    flex: 2,
  },
  price: {
    flex: 1,
    textAlign: 'right',
  },
});

export default BookingHistory;
