import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const LekcijeScreen = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });

  const lessons = [
"Započnite s lekcijama koje su namijenjene onima koji tek ulaze u svijet badmintona!",
    <Text style={styles.titleText}>Osnovne lekcije</Text>,
    "Čvrsto primite i podignite reket. Držite reket čvrsto u dominantnoj ruci s palcem postavljenim na stražnju stranu drške. Podignite reket do visine ramena držeći ruku lagano savijenu.",
    <Text style={styles.titleText}>Osnovni forehand grip</Text>,
    "Držite reket kao da se rukujete postavljajući palac i kažiprst u obliku slova V. Držite zapešće opušteno za lakše udarce.",
    <Text style={styles.titleText}>Osnovni backhand grip</Text>,
    "Rotirajte reket u ruci tako da palac pritisne ravnu stranu drške. To vam daje kontrolu i snagu za udarce s backhand strane.",
    <Text style={styles.titleText}>Priprema za udarac – forehand</Text>,
    "Okrenite tijelo bočno prema mreži, reketom podignutim iznad ramena. Držite lakat visoko i pripremite se za udarac naprijed.",
    <Text style={styles.titleText}>Priprema za udarac – backhand</Text>,
    "Okrenite tijelo bočno s reketom ispred sebe. Rotirajte tijelo u smjeru udarca držeći reket čvrsto za kontrolu.",
    <Text style={styles.titleText}>Osnovni rad nogu</Text>,
    "Postavite stopala u širinu ramena, koljena su lagano savijena. Brzo se krećite prema loptici malim koracima, uvijek držeći ravnotežu.",
    <Text style={styles.titleText}>Početni servis – forehand</Text>,
    "Stojte bočno prema mreži, držite reket nisko i udarite lopticu prema gore ravnim pokretom prema naprijed.",
    <Text style={styles.titleText}>Početni servis – backhand</Text>,
    "Stanite blizu mreže, držite lopticu ispred tijela i blagim pokretom zgloba udarite lopticu tako da leti nisko preko mreže.",
    <Text style={styles.titleText}>Osnove ravnoteže i postavljanja tijela</Text>,
    "Držite centar težine nisko, s lagano savijenim koljenima, spremni za brzu promjenu smjera. Držite reket uvijek ispred sebe.",
    <Text style={styles.titleText}>Lob udarac (visoko odbacivanje)</Text>,
    "Udarite lopticu ispod nje s donje strane koristeći zapešće kako bi je poslali visoko i duboko na protivničku stranu terena.",
    <Text style={styles.titleText}>Drop shot udarac (blagi pad)</Text>,
    "Lagano udarite lopticu ispred sebe usporavajući pokret na kraju, tako da loptica blago padne blizu mreže.",
    <Text style={styles.titleText}>Clear udarac (visoki udarac)</Text>,
    "Udarite lopticu iznad glave punim zamahom prema gore kako biste je poslali što dublje prema stražnjem dijelu protivničkog terena.",
    <Text style={styles.titleText}>Drive udarac</Text>,
    "Udarite lopticu ravno i brzo u visini ramena usmjeravajući je nisko iznad mreže s kontroliranim zamahom.",
    <Text style={styles.titleText}>Smash udarac (zabijanje)</Text>,
    "Brzo podignite reket visoko iznad glave i snažno udarite lopticu prema dolje ciljajući protivničku stranu terena.",
    <Text style={styles.titleText}>Block udarac (obrambeni blok)</Text>,
    "Udarite lopticu odmah nakon što pređe mrežu lagano je zaustavljajući reketom tako da je vratite nisko i kratko.",
    <Text style={styles.titleText}>Net udarac (udarac blizu mreže)</Text>,
    "Koristite lagani udarac niskim zamahom blizu mreže s fokusom na preciznost i kontrolu nad smjerom loptice.",
    <Text style={styles.titleText}>Crosscourt udarci</Text>,
    "Udarite lopticu dijagonalno prema protivničkoj strani terena ciljajući kutove za otežavanje povratka loptice.",
    <Text style={styles.titleText}>Finta (lažni udarac)</Text>,
    "Započnite kao da ćete udariti snažno, ali usporite pokret u zadnjem trenutku, šaljući lopticu lagano blizu mreže.",
    <Text style={styles.titleText}>Underarm clear</Text>,
    "Udarite lopticu iz donjeg položaja koristeći zamah prema gore da je pošaljete visoko i duboko na protivnički teren.",
    <Text style={styles.titleText}>Napredne tehnike i taktike</Text>,
    "Napredni forehand smash Dodajte rotaciju zapešća pri udarcu kako biste povećali brzinu loptice ciljajući oštro prema protivničkom terenu.",
    <Text style={styles.titleText}>Napredni backhand smash</Text>,
    "Brzo prebacite reket na backhand stranu, rotirajte tijelo i snažno udarite lopticu prema dolje na protivnički teren.",
    <Text style={styles.titleText}>Refleksna igra na mreži</Text>,
    "Držite reket ispred sebe i brzo reagirajte na dolazeće loptice lagano ih vraćajući bez gubljenja kontrole.",
    <Text style={styles.titleText}>Kombinirani udarci</Text>,
    "Vježbajte brzo kombiniranje udaraca poput drop shota i smasha kako biste iznenadili protivnika promjenom tempa.",
    <Text style={styles.titleText}>Izvođenje obrane smasha</Text>,
    "Koristite reket da blokirate snažni udarac blizu tijela vraćajući lopticu nisko preko mreže.",
    <Text style={styles.titleText}>Napredna kontrola servisa</Text>,
    "Varirajte brzinu i kut servisa kako biste zbunili protivnika, ciljajte nisko i visoko kako biste promijenili dinamiku poena.",
    <Text style={styles.titleText}>Napredni footwork (kretanje po terenu)</Text>,
    "Vježbajte brzo kretanje naprijed i natrag s kratkim i brzim koracima uvijek držeći ravnotežu za brzu reakciju.",
    <Text style={styles.titleText}>Taktike igre na mreži</Text>,
    "Kontrolirajte igru blizu mreže brzim i kratkim udarcima tjerajući protivnika da pogriješi.",
    <Text style={styles.titleText}>Crosscourt smash</Text>,
    "Udarite lopticu dijagonalno preko terena s ciljem u kut koristeći puni zamah i rotaciju zapešća.",
    <Text style={styles.titleText}>Kontrolirani lob udarci</Text>,
    "Udarite lopticu visoko prema stražnjem dijelu protivničkog terena koristeći kontrolirani zamah za preciznost.",
    <Text style={styles.titleText}>Korištenje kutova u igri</Text>,
    "Šaljite lopticu u kutove terena kako biste prisilili protivnika na neudobne udarce izvan ravnoteže.",
    <Text style={styles.titleText}>Upravljanje tempom igre</Text>,
    "Mijenjajte tempo igre između sporijih udaraca i brzih napada kako biste zbunili protivnika i preuzeli kontrolu.",
    <Text style={styles.titleText}>Izrada plana igre prema protivniku</Text>,
    "Analizirajte slabosti protivnika i koristite udarce koji ih prisiljavaju na greške ili slabe povratke.",
    <Text style={styles.titleText}>Psihološke strategije u badmintonu</Text>,
    "Ostanite mentalno jaki i fokusirani, koristite pozitivne misli i ne dopustite da vas protivnik dekoncentrira.",
    <Text style={styles.titleText}>Napredne taktike i sparing</Text>,
    "Napredni obrambeni udarci Usavršite tehnike vraćanja teških smasheva koristeći blok te precizne i kratke udarce.",
    <Text style={styles.titleText}>Taktika igre u parovima</Text>,
    "Učite kako se učinkovito pozicionirati u parovima i komunicirati s partnerom kako biste pokrili cijeli teren.",
    <Text style={styles.titleText}>Brza izmjena udaraca (rally trening)</Text>,
    "Trenirajte brzu izmjenu udaraca s partnerom usredotočujući se na izdržljivost i brzinu reakcije.",
    <Text style={styles.titleText}>Sparing – agresivna igra</Text>,
    "Vježbajte agresivne napade protiv partnera fokusirajući se na brze udarce i preuzimanje inicijative.",
    <Text style={styles.titleText}>Sparing – defenzivna igra</Text>,
    "Učite kako se braniti od napada održavajući ravnotežu i vraćajući loptice s preciznošću.",
    <Text style={styles.titleText}>Analiza vlastite igre</Text>,
    "Snimite svoju igru i analizirajte pogreške te prilagodite taktike i tehniku za poboljšanje.",
    <Text style={styles.titleText}>Korištenje senzora za analizu performansi</Text>,
    "Pratite podatke senzora kako biste poboljšali brzinu, preciznost i konzistentnost u udarcima.",
    <Text style={styles.titleText}>Kondicijski trening za badminton</Text>,
    "Fokusirajte se na izdržljivost, snagu i brzinu kroz kondicijske vježbe koje oponašaju stvarne uvjete na terenu.",
    <Text style={styles.titleText}>Raspored treninga</Text>,
    "Postavite tjedni plan treninga kombinirajući tehničke i fizičke vježbe za postizanje maksimalnog napretka.",
    <Text style={styles.titleText}>Natjecateljska strategija</Text>,
    "Vježbajte kako se mentalno i fizički pripremiti za turnire te kako prilagoditi igru tijekom natjecanja."
  ];
if (sensorData.accelerationX > 10) {
    setMessage("Osnovne lekcije počnite s temeljnim gripovima!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX < 5) {
    setMessage("Osnovni forehand grip: Držite reket čvrsto!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX > 7) {
    setMessage("Osnovni backhand grip: Držite reket u obliku slova V!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX > 8) {
    setMessage("Priprema za udarac – forehand: Okrenite tijelo bočno!");
    setLessonCompleted(true);
}

if (sensorData.accelerationY < 5) {
    setMessage("Priprema za udarac – backhand: Rotirajte tijelo!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX > 6) {
    setMessage("Osnovni rad nogu: Brzo se krećite prema loptici!");
    setLessonCompleted(true);
}

if (sensorData.accelerationZ > 8) {
    setMessage("Početni servis – forehand: Udarite lopticu ravnim pokretom!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX < 7) {
    setMessage("Početni servis – backhand: Udarite lopticu nisko!");
    setLessonCompleted(true);
}

if (sensorData.accelerationY > 5) {
    setMessage("Osnove ravnoteže: Držite koljena lagano savijena!");
    setLessonCompleted(true);
}

if (sensorData.accelerationZ < 4) {
    setMessage("Lob udarac: Udarite lopticu ispod nje!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX > 8) {
    setMessage("Drop shot udarac: Usporite pokret!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX > 9) {
    setMessage("Clear udarac: Udarite punim zamahom!");
    setLessonCompleted(true);
}

if (sensorData.accelerationY < 6) {
    setMessage("Drive udarac: Udarite nisko iznad mreže!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX > 11) {
    setMessage("Smash udarac: Podignite reket visoko!");
    setLessonCompleted(true);
}

if (sensorData.accelerationY < 4) {
    setMessage("Block udarac: Lagano zaustavite lopticu!");
    setLessonCompleted(true);
}

if (sensorData.accelerationZ > 10) {
    setMessage("Net udarac: Preciznost i kontrola!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX > 6) {
    setMessage("Crosscourt udarci: Udarite dijagonalno!");
    setLessonCompleted(true);
}

if (sensorData.accelerationY < 5) {
    setMessage("Finta: Usporite pokret!");
    setLessonCompleted(true);
}

if (sensorData.accelerationZ > 9) {
    setMessage("Underarm clear: Udarite iz donjeg položaja!");
    setLessonCompleted(true);
}

if (sensorData.accelerationY > 10) {
    setMessage("Napredne tehnike: Rotacija zapešća!");
    setLessonCompleted(true);
}

if (sensorData.accelerationZ < 6) {
    setMessage("Napredni backhand smash: Brza rotacija!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX > 12) {
    setMessage("Refleksna igra na mreži: Brze reakcije!");
    setLessonCompleted(true);
}

if (sensorData.accelerationY > 8) {
    setMessage("Kombinirani udarci: Vježbajte drop shot i smash!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX > 11) {
    setMessage("Obrana smasha: Blokirajte udarac!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX < 5) {
    setMessage("Napredna kontrola servisa: Varirajte brzinu!");
    setLessonCompleted(true);
}

if (sensorData.accelerationZ > 12) {
    setMessage("Napredni footwork: Brzi koraci!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX > 10) {
    setMessage("Taktike igre na mreži: Kratki udarci!");
    setLessonCompleted(true);
}

if (sensorData.accelerationY > 7) {
    setMessage("Crosscourt smash: Udarite u kut!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX > 9) {
    setMessage("Kontrolirani lob: Preciznost udarca!");
    setLessonCompleted(true);
}

if (sensorData.accelerationZ < 7) {
    setMessage("Korištenje kutova u igri: Otežajte protivniku!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX < 8) {
    setMessage("Izrada plana igre: Iskoristite slabosti!");
    setLessonCompleted(true);
}

if (sensorData.accelerationY > 9) {
    setMessage("Psihološke strategije: Ostanite fokusirani!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX > 12) {
    setMessage("Napredne taktike: Vraćanje smasha!");
    setLessonCompleted(true);
}

if (sensorData.accelerationZ > 8) {
    setMessage("Taktika u parovima: Komunicirajte!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX < 6) {
    setMessage("Brza izmjena udaraca: Fokusirajte se na izdržljivost!");
    setLessonCompleted(true);
}

if (sensorData.accelerationY > 10) {
    setMessage("Sparing – agresivna igra: Brzi napadi!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX > 7) {
    setMessage("Sparing – defenzivna igra: Preciznost u obrani!");
    setLessonCompleted(true);
}

if (sensorData.accelerationY > 8) {
    setMessage("Analiza igre: Prilagodite taktike!");
    setLessonCompleted(true);
}

if (sensorData.accelerationZ > 9) {
    setMessage("Korištenje senzora: Poboljšajte performanse!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX > 6) {
    setMessage("Kondicijski trening: Oponašajte uvjete na terenu!");
    setLessonCompleted(true);
}

if (sensorData.accelerationY < 5) {
    setMessage("Raspored treninga: Planirajte napredak!");
    setLessonCompleted(true);
}

if (sensorData.accelerationX > 10) {
    setMessage("Natjecateljska strategija: Pripremite se za turnire!");
    setLessonCompleted(true);
}

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

  return (
    <View style={styles.container}>
      <View style={styles.lessonTitleContainer}>
        <Text style={styles.titleText}>{lessons[currentLesson]}</Text>
      </View>
      <View style={styles.lessonContentContainer}>
        <Text style={styles.lessonText}>Current Acceleration: {`X: ${acceleration.x}, Y: ${acceleration.y}, Z: ${acceleration.z}`}</Text>
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

