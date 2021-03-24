import React from 'react';
import {Vibration, View, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';
import { StatusBar } from 'expo-status-bar';

const image = { uri: "https://opengameart.org/sites/default/files/ninjarunnerbg.png" };

export default class App extends React.Component {

  state = {
    contador: 0,
    primeiroclique: true,
    historico: [],
    record: 0
  }

  render() {
    return (
    <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          
          <Text style={styles.record}>{this.state.record}</Text>
          <Text style={styles.last}>{this.state.historico[2]}</Text>
          <Text style={styles.middle}>{this.state.historico[1]}</Text>
          <Text style={styles.first}>{this.state.historico[0]}</Text>
          <Text style={styles.contador}>{this.state.contador}</Text>

          <TouchableOpacity style={styles.btn} onPress={() => this.clique()}>
            <Text style={styles.btnLabel}>Click</Text>
          </TouchableOpacity>

          <StatusBar style="auto"></StatusBar>
        </ImageBackground>
    </View>);
  }

  clique() {
    if (this.state.primeiroclique) {
      setTimeout(() => this.fim(), 3000);
      this.setState({ primeiroclique: false });
    }
    this.playSound();
    this.setState({ contador: this.state.contador + 1 });
  }

  fim() {
    Vibration.vibrate(100);
    Alert.alert("Fim do Jogo", `Pontuação: ${this.state.contador}`);
    let temp = [this.state.contador,this.state.historico[0],this.state.historico[1]];

    if(this.state.record<this.state.contador){
      this.setState({record: this.state.contador});
    }
    this.setState({ contador: 0, primeiroclique: true, historico: temp});
  }

  async playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/smb_coin.wav')
    );
    console.log('Playing Sound');
    await sound.playAsync();
  }

}//end class

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcba03",

  },
  titulo: {
    color: "white",
    fontSize: 40
  },
  contador: {
    color: "#fff",
    fontSize: 100
  },
  btn: {
    backgroundColor: "#7a5a00",
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 20
  },
  btnLabel: {
    color: "#fff",
    fontSize: 30
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center"
  },
  first: {
    fontSize: 20,
    color: "#0e8ac4"
  },
  middle:{
    fontSize: 15,
    color:"#0e6cc4"
  },
  last:{
    fontSize: 10,
    color:"#200ec4"
  },
  record:{
    color: "#dbbe16",
    fontSize: 70
  }

});
