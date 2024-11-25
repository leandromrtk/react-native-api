import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';

const API_KEY = '1c5ee510687a9a3b74407f647db9ad42';

export default function App() {
  
  const [cidade, setCidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  async function buscarCidade(){
    if (cidade === "") {
      Alert.alert('Cidade não encontrada');
      return;
    }

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`);

      const weather = response.data.weather[0];
      const main = response.data.main;
      const coord = response.data.coord;

      setDescricao(weather.description);
      setTemperatura(main.temp.toString() + '°C');
      setLatitude(coord.lat.toString());
      setLongitude(coord.lon.toString());
    } catch (error) {
      console.error("Erro: " + error);
      Alert.alert('Erro ao buscar dados. Verifique o nome da cidade ou a conexão.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Clima</Text>
      </View>

      <View style={styles.containerClima}>
        <TextInput
          style={{
            borderColor: "#000000",
            borderWidth: 2,
            width: 200,
            fontSize: 18,
            marginTop: 20,
            marginEnd: 20,
            borderRadius: 10,
            padding: 15
          }}
          value={cidade}
          onChangeText={(texto) => setCidade(texto)}
          placeholder='Cidade'
        />

        <TouchableOpacity style={styles.botaoBuscar} onPress={buscarCidade}>
          <Text style={styles.textoBotaoBuscar}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TextInput
          style={styles.caixaTexto}
          value={descricao}
          placeholder='Descrição'
          editable={false}
        />
        <TextInput
          style={styles.caixaTexto}
          value={temperatura}
          placeholder='Temperatura'
          editable={false}
        />
        <TextInput
          style={styles.caixaTexto}
          value={latitude}
          placeholder='Latitude'
          editable={false}
        />
        <TextInput
          style={styles.caixaTexto}
          value={longitude}
          placeholder='Longitude'
          editable={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  topBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: "#0185"
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 15, 
    textAlign:'center',
    alignContent:'center',
    alignContent:'center'
  },
  containerClima: {
    flexDirection: 'row',
    height: 100,
    marginHorizontal: 20,
  },
  botaoBuscar: {
    backgroundColor: '#0196',
    height: 70,
    width: 120,
    marginTop: 30,
    marginEnd: 20,
    borderRadius: 10,
    padding: 20
  },
  textoBotaoBuscar: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  caixaTexto: {
    borderColor: '#000000',
    borderWidth: 2,
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 20
  }
});
