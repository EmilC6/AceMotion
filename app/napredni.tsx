import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();

const LekcijeScreen = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [sensorData, setSensorData] = useState(null);

  const lessons = [
    { title: "Uvod", content: "Započnite s lekcijama koje su namijenjene onima koji tek ulaze u svijet badmintona!" },
    { title: "Osnovne lekcije", content: "Čvrsto primite i podignite reket. Držite reket čvrsto u dominantnoj ruci s palcem postavljenim na stražnju stranu drške." },
    { title: "Osnovni forehand grip", content: "Držite reket kao da se rukujete postavljajući palac i kažiprst u obliku slova V. Držite zapešće opušteno za lakše udarce." },
    { title: "Osnovni backhand grip", content: "Rotirajte reket u ruci tako da palac pritisne ravnu stranu drške. To vam daje kontrolu i snagu za udarce s backhand strane." },
    { title: "Priprema za udarac – forehand", content: "Okrenite tijelo bočno prema mreži, reketom podignutim iznad ramena. Držite lakat visoko i pripremite se za udarac naprijed." },
    { title: "Priprema za udarac – backhand", content: "Držite reket blizu tijela, okrećući rame unazad. Koristite zglob i ruku za precizne udarce." },
    { title: "Osnovni udarci", content: "Forehand i backhand udarci su temeljni. Koristite pravilan grip i držanje za precizne udarce." },
    { title: "Kretanje po terenu", content: "Koristite lagane i brze korake kako biste se pravilno postavili za svaki udarac." },
    { title: "Pravila igre", content: "Upoznajte se s osnovnim pravilima igre, bodovanjem i načinom serviranja." }
  ];

  const handleNextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  useEffect(() => {
    const subscribe = Accelerometer.addListener(({ x, y, z }) => {
      setAcceleration({ x, y, z });
      if (x > 1.5) handleNextLesson();
      if (x < -1.5) handlePreviousLesson();
    });

    return () => subscribe.remove();
  }, []);

  useEffect(() => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) return;
      if (device.name === 'ArduinoSensor') {
        manager.stopDeviceScan();
        device.connect().then(device => {
          return device.discoverAllServicesAndCharacteristics();
        }).then(device => {
          return device.readCharacteristicForService('service-uuid', 'characteristic-uuid');
        }).then(characteristic => {
          const value = characteristic.value;
          setSensorData(parseInt(value, 10));
          setCurrentLesson(parseInt(value, 10) % lessons.length);
        });
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.lessonTitleContainer}>
        <Text style={styles.titleText}>{lessons[currentLesson].title}</Text>
      </View>
      <View style={styles.lessonContentContainer}>
        <Text style={styles.lessonText}>{lessons[currentLesson].content}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.navButton, currentLesson === 0 && styles.disabledButton]} 
          onPress={handlePreviousLesson} 
          disabled={currentLesson === 0}
        >
          <Text style={styles.buttonText}>Prethodna</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navButton, currentLesson === lessons.length - 1 && styles.disabledButton]} 
          onPress={handleNextLesson} 
          disabled={currentLesson === lessons.length - 1}
        >
          <Text style={styles.buttonText}>Sljedeća</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  lessonTitleContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  lessonContentContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
  },
  lessonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Arial', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#2a2f34',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#b0b0b0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LekcijeScreen;

