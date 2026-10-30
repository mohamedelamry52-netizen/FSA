import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const valeurStock = 1960;
  const nbDisponibles = 3;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catalogue de produits</Text>
      <Text style={styles.item}>Produits disponibles : {nbDisponibles}</Text>
      <Text style={styles.item}>Valeur totale du stock : {valeurStock} MAD</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  item: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
});