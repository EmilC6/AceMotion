import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();

const LekcijeScreen = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [sensorData, setSensorData] = useState(null);

  const lessons = [
    "Opuštenije držanje reketa",
    "Držite reket previše čvrsto. Opuštenije zapešće omogućuje brže reakcije i preciznije udarce.",
    "Poboljšajte backhand grip",
    "Backhand udarac nije optimalan. Rotirajte reket tako da palac pritišće ravnu stranu drške za više kontrole.",
    "Bolji kontakt s lopticom",
    "Loptica ne pogađa centar reketa. Fokusirajte se na bolji položaj tijela prije udarca za precizniji kontakt.",
    "Pojačajte snagu u forehand udarcima",
    "Forehand udarci nedovoljno snažni. Koristite rotaciju tijela i zapešća kako biste povećali brzinu loptice.",
    "Ravnomjerniji zamah kod smasha",
    "Smanjite trzaj pri udarcu. Zamah treba biti fluidan i dosljedan od početka do kraja.",
    "Veća kontrola pri backhand smashu",
    "Backhand smash previše neprecizan. Držite lakat bliže tijelu i fokusirajte se na rotaciju zapešća.",
    "Optimizacija drop shot udarca",
    "Prejako izvodite drop shot. Smanjite snagu i fokusirajte se na lagani i precizni pokret.",
    "Poboljšanje preciznosti loba",
    "Lobovi su prekratki. Podignite reket iznad glave kako biste dobili bolju dubinu u udarcima.",
    "Servis više prema kutovima",
    "Vaši su servisi previše centrirani. Ciljajte kutove terena kako biste otežali protivniku vraćanje loptice.",
    "Smanjite snagu servisa",
    "Servis je prejak i završava izvan terena. Pokušajte laganiji zamah s većom kontrolom.",
    "Varirajte visinu servisa",
    "Servisi su uvijek iste visine. Varirajte visinu kako biste protivnika držali nesigurnim.",
    "Brže vraćanje u centralnu poziciju",
    "Nakon udarca predugo ostajete na mjestu. Brže se vraćajte u središnju poziciju za bolju pokrivenost terena.",
    "Bolji rad nogu kod promjena smjera",
    "Spora reakcija pri promjeni smjera. Vježbajte brze i male korake kako biste se lakše kretali po terenu.",
    "Koristite manji broj koraka",
    "Previše koraka prilikom prilaska loptici. Pokušajte veće korake kako biste brže došli do idealne pozicije.",
    "Bolje pozicioniranje prije udarca",
    "Niste u idealnoj poziciji za udarac. Pokušajte se ranije pozicionirati kako biste imali više vremena za reakciju.",
    "Raznovrsniji udarci",
    "Previše koristite iste udarce. Kombinirajte drop shot, lob i smash kako biste varirali igru.",
    "Napad na slabosti protivnika",
    "Vaši udarci nisu ciljani prema slabostima protivnika. Analizirajte njihove pokrete i koristite kutove za stvaranje pritiska.",
    "Bolja priprema za povratak smasha",
    "Sporo reagirate na protivnički smash. Ostanite nisko s reketom spremnim za brzu obranu.",
    "Učinkovitija obrana",
    "Vaša obrana nije dovoljno čvrsta. Držite reket ispred sebe i fokusirajte se na brze reakcije.",
    "Bolja koordinacija pri igri na mreži",
    "Igra blizu mreže nije dovoljno precizna. Fokusirajte se na lagane i kontrolirane udarce koji ostavljaju lopticu blizu mreže.",
    "Bolja kontrola zapešća",
    "Previše pokrećete zapešće prilikom udarca što smanjuje preciznost. Pokušajte stabilnije držanje.",
  ];

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
      <Text style={styles.titleText}>Lekcija {currentLesson + 1}</Text>
      <Text style={styles.lessonText}>{lessons[currentLesson]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#f2f2f2' },
  titleText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  lessonText: { fontSize: 16, textAlign: 'center', color: '#000' },
});

export default LekcijeScreen;
