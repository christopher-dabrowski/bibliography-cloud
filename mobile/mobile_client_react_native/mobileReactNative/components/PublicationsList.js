import React, { useState } from 'react';
import { Text, View, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function PublicationsList({ publications }) {

  return (
    <View style={styles.container}>

      <FlatList
        data={publications}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});