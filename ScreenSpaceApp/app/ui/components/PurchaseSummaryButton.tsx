import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const PurchaseSummaryButton = ({
  movieTitle,
  moviePrice,
  date,
  cinema,
  onPress,
  imageUrl,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.movieTitle}>{movieTitle}</Text>
          <Text style={styles.subtitle}>Fecha: {date}</Text>
          <Text style={styles.subtitle}>Cine: {cinema}</Text>
          <Text style={styles.moviePrice}>${moviePrice}</Text>
        </View>
        <View>
          <Image source={{uri: imageUrl}} style={styles.image} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000',
  },
  movieTitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFF',
  },
  moviePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  image: {
    width: 150,
    height: 100,
  },
});

export default PurchaseSummaryButton;
