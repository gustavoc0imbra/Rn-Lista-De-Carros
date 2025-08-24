import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';

type Brand = {
  id: number,
  name: string
};

type Car = {
  id: number;
  brand: Brand,
  name: string;
};

export default function HomeScreen() {
  const brands: Brand[] = [
    {
      id: 1,
      name: "Chevrolet"
    },
    {
      id: 2,
      name: "Fiat"
    },
    {
      id: 3,
      name: "Pegeout"
    },
  ];

  const [cars, setCars] = useState<Car[]>([
    { id: 1, brand: brands[0], name: "Corsa" },
    { id: 2, brand: brands[1], name: "Palio" },
  ]);

  const [showForm, setShowForm] = useState<Boolean>(false);
  const [carDesc, setCarDesc] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<number>(1);
  const [nextId, setNextId] = useState<number>(3);
  const [selectedCar, setSelectedCar] = useState(null);

  const Item = ({ item }: { item: Car }) => (
    <View style={styles.item}>
      <Text>
        {item.id} - {item.name} - ({item.brand.id} - {item.brand.name})
      </Text>
    </View>
  );

  const handleAddItem = () => {
    setShowForm(true);
  };

  const handleCancelAddItem = () => {
    setShowForm(false);
  };

  const addItem = () => {
    if(selectedBrand === -1) {
      console.log("Marca não selecionada")
      Alert.alert("Atenção", "Favor selecionar uma marca!");
      return;
    }

    const brand = brands.find((item) => item.id === selectedBrand);

    if(brand === undefined) {
      console.log("Marca não encontrada")
      Alert.alert("Atenção", "Selecione uma marca válida!");
      return;
    }

    if(carDesc.length === 0 || !carDesc.trim()) {
      Alert.alert("Atenção", "Favor digitar o nome do carro");
      return;
    }

    const newCar: Car = {
      id: nextId,
      brand: brand,
      name: carDesc
    };

    setCars((old) => [...old, newCar]);
    setNextId((actual) => ++actual);
    setSelectedBrand(brands[0].id);
    setCarDesc("");
    setShowForm(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Lista de jogos favoritos</Text>

      {
        showForm && (
          <View style={{ gap: 16, backgroundColor: "#e6e6e6ff", padding: 6 }}>
            <View>
              <Picker
                selectedValue={brands[0].id}
                onValueChange={(itemValue, itemIndex) =>{
                  setSelectedBrand(Number.parseInt(itemValue))
                }}
              >
                {
                  brands.map((brand) => {
                    return <Picker.Item key={brand.id} label={brand.name} value={brand.id} />
                  })
                }
              </Picker>
              <Text style={styles.label}>Carro:</Text>
              <TextInput
                placeholder="Digite o nome do carro"
                onChangeText={setCarDesc}
                style={styles.input}
              />
            </View>
            
            <TouchableOpacity style={[styles.button]} onPress={addItem}>
              <Text style={[styles.textCenter, styles.textBold, styles.textWhite]}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={handleCancelAddItem}>
              <Text style={[styles.textCenter, styles.textBold, styles.textWhite]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )
      }


      <FlatList
        data={[...cars].sort((a, b) => a.id - b.id)}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
          >
            <Text style={{ backgroundColor: "white" }}>{item.id} - {item.name} - ({item.brand.id} - {item.brand.name})</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>Sem registros :</Text>}
      />

      <TouchableOpacity style={styles.fab} onPress={handleAddItem}>
        <Text>+</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center", flex: 1, padding: 16, backgroundColor: "#FFF" },
  label: { marginTop: 8, marginBottom: 4, fontSize: 12, color: "#444" },
  input: {
    borderWidth: 1,
    borderColor: "#1b29f0ff",
    borderRadius: 10,
    padding: 10,
  },
  item: { padding: 12 },
  header: { fontSize: 22, fontWeight: "bold", textTransform: "uppercase" },
  button: {
    borderRadius: 6,
    padding: 8,
    backgroundColor: "#1b29f0ff",
    textAlign: "center"
  },
  dangerButton: {
    backgroundColor: "#fc6d6dff",
  },
  fab: {
    backgroundColor: "#1b29f0ff",
    position: "absolute",
    right: 16,
    bottom: 8,
    padding: 6,
    borderRadius: 28,
    width: 56,
    heigth: 56,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 0px 0px #000"
  },
  textCenter: {
    textAlign: "center"
  },
  textBold: {
    fontWeight: "bold"
  },
  textWhite: {
    color: "#FFF"
  }
});
