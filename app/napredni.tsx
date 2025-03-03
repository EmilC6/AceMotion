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
  { title: "Opuštenije držanje reketa", content: "Držite reket previše čvrsto. Opuštenije zapešće omogućuje brže reakcije i preciznije udarce." },
  { title: "Poboljšajte backhand grip", content: "Backhand udarac nije optimalan. Rotirajte reket tako da palac pritišće ravnu stranu drške za više kontrole." },
  { title: "Bolji kontakt s lopticom", content: "Loptica ne pogađa centar reketa. Fokusirajte se na bolji položaj tijela prije udarca za precizniji kontakt." },
  { title: "Pojačajte snagu u forehand udarcima", content: "Forehand udarci nedovoljno snažni. Koristite rotaciju tijela i zapešća kako biste povećali brzinu loptice." },
  { title: "Ravnomjerniji zamah kod smasha", content: "Smanjite trzaj pri udarcu. Zamah treba biti fluidan i dosljedan od početka do kraja." },
  { title: "Veća kontrola pri backhand smashu", content: "Backhand smash previše neprecizan. Držite lakat bliže tijelu i fokusirajte se na rotaciju zapešća." },
  { title: "Optimizacija drop shot udarca", content: "Prejako izvodite drop shot. Smanjite snagu i fokusirajte se na lagani i precizni pokret." },
  { title: "Poboljšanje preciznosti loba", content: "Lobovi su prekratki. Podignite reket iznad glave kako biste dobili bolju dubinu u udarcima." },
  { title: "Servis više prema kutovima", content: "Vaši su servisi previše centrirani. Ciljajte kutove terena kako biste otežali protivniku vraćanje loptice." },
  { title: "Smanjite snagu servisa", content: "Servis je prejak i završava izvan terena. Pokušajte laganiji zamah s većom kontrolom." },
  { title: "Varirajte visinu servisa", content: "Servisi su uvijek iste visine. Varirajte visinu kako biste protivnika držali nesigurnim." },
  { title: "Brže vraćanje u centralnu poziciju", content: "Nakon udarca predugo ostajete na mjestu. Brže se vraćajte u središnju poziciju za bolju pokrivenost terena." },
  { title: "Bolji rad nogu kod promjena smjera", content: "Spora reakcija pri promjeni smjera. Vježbajte brze i male korake kako biste se lakše kretali po terenu." },
  { title: "Koristite manji broj koraka", content: "Previše koraka prilikom prilaska loptici. Pokušajte veće korake kako biste brže došli do idealne pozicije." },
  { title: "Bolje pozicioniranje prije udarca", content: "Niste u idealnoj poziciji za udarac. Pokušajte se ranije pozicionirati kako biste imali više vremena za reakciju." },
  { title: "Raznovrsniji udarci", content: "Previše koristite iste udarce. Kombinirajte drop shot, lob i smash kako biste varirali igru." },
  { title: "Napad na slabosti protivnika", content: "Vaši udarci nisu ciljani prema slabostima protivnika. Analizirajte njihove pokrete i koristite kutove za stvaranje pritiska." },
  { title: "Bolja priprema za povratak smasha", content: "Sporo reagirate na protivnički smash. Ostanite nisko s reketom spremnim za brzu obranu." },
  { title: "Učinkovitija obrana", content: "Vaša obrana nije dovoljno čvrsta. Držite reket ispred sebe i fokusirajte se na brze reakcije." },
  { title: "Bolja koordinacija pri igri na mreži", content: "Igra blizu mreže nije dovoljno precizna. Fokusirajte se na lagane i kontrolirane udarce koji ostavljaju lopticu blizu mreže." },
  { title: "Povećanje snage udaraca", content: "Vaši su udarci nedovoljno snažni. Radite na snazi ruke i zapešća za jače udarce." },
  { title: "Povećanje preciznosti smasha", content: "Smashovi su previše neprecizni. Fokusirajte se na jednu točku i ciljajte niže prema protivničkom terenu." },
  { title: "Smanjenje grešaka u lobovima", content: "Previše lob udaraca završava izvan terena. Ciljajte dublje, ali s većom kontrolom." },
  { title: "Preciznije vraćanje loptice", content: "Vaši udarci često završavaju u središtu protivničkog terena. Ciljajte kutove ili blizu mreže za učinkovitiju igru." },
  { title: "Bolja kontrola zapešća", content: "Previše pokrećete zapešće prilikom udarca što smanjuje preciznost. Pokušajte stabilnije držanje." },
  { title: "Ravnoteža tijela prilikom udarca", content: "Gubite ravnotežu prilikom udaraca. Radite na održavanju čvrstog stava i stabilne baze dok izvodite udarce." },
  { title: "Bolja koordinacija pokreta", content: "Vaši udarci i kretanje nisu usklađeni. Pokušajte sinkronizirati pokrete ruku i nogu za veću učinkovitost." },
  { title: "Bolja koncentracija na udarac", content: "Gubite fokus prilikom ključnih udaraca. Usredotočite se na tehniku i kontrolu prilikom svakog udarca." },
  { title: "Strpljenje tijekom dugih izmjena", content: "Prebrzo pokušavate završiti poen. Budite strpljiviji i čekajte pravu priliku za napad." },
  { title: "Održavanje smirenosti pod pritiskom", content: "Pod pritiskom često griješite. Pokušajte kontrolirati tempo igre i smireno donositi odluke." }
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

