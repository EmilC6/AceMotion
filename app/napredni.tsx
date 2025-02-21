import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NapredniScreen = () => {
  const [sensorMessage, setSensorMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const sensorTips = {
    opustenije: "Držite reket previše čvrsto. Opuštenije zapešće omogućuje brže reakcije i preciznije udarce.",
    backhand: "Backhand udarac nije optimalan. Rotirajte reket tako da palac pritišće ravnu stranu drške za više kontrole.",
    kontakt: "Loptica ne pogađa centar reketa. Fokusirajte se na bolji položaj tijela prije udarca za precizniji kontakt.",
    snaga: "Forehand udarci nedovoljno snažni. Koristite rotaciju tijela i zapešća kako biste povećali brzinu loptice.",
    zamah: "Smanjite trzaj pri udarcu. Zamah treba biti fluidan i dosljedan od početka do kraja.",
    smash: "Backhand smash previše neprecizan. Držite lakat bliže tijelu i fokusirajte se na rotaciju zapešća.",
    optimizacija: "Prejako izvodite drop shot. Smanjite snagu i fokusirajte se na lagani i precizni pokret.",
    lob: "Lobovi su prekratki. Podignite reket iznad glave kako biste dobili bolju dubinu u udarcima.",
    servis: "Vaši su servisi previše centrirani. Ciljajte kutove terena kako biste otežali protivniku vraćanje loptice.",
    laganije: "Servis je prejak i završava izvan terena. Pokušajte laganiji zamah s većom kontrolom.",
    visina: "Servisi su uvijek iste visine. Varirajte visinu kako biste protivnika držali nesigurnim.",
    centralno: "Nakon udarca predugo ostajete na mjestu. Brže se vraćajte u središnju poziciju za bolju pokrivenost terena.",
    noge: "Spora reakcija pri promjeni smjera. Vježbajte brze i male korake kako biste se lakše kretali po terenu.",
    koraci: "Previše koraka prilikom prilaska loptici. Pokušajte veće korake kako biste brže došli do idealne pozicije.",
    pozicija: "Niste u idealnoj poziciji za udarac. Pokušajte se ranije pozicionirati kako biste imali više vremena za reakciju.",
    raznovrsno: "Previše koristite iste udarce. Kombinirajte drop shot, lob i smash kako biste varirali igru.",
    protivnik: "Vaši udarci nisu ciljani prema slabostima protivnika. Analizirajte njihove pokrete i koristite kutove za stvaranje pritiska.",
    povratak:"Sporo reagirate na protivnički smash. Ostanite nisko s reketom spremnim za brzu obranu.",
    ucinkovito: "Vaša obrana nije dovoljno čvrsta. Držite reket ispred sebe i fokusirajte se na brze reakcije.", 
    mreza: "Igra blizu mreže nije dovoljno precizna. Fokusirajte se na lagane i kontrolirane udarce koji ostavljaju lopticu blizu mreže.",  
    snazno: "Vaši su udarci nedovoljno snažni. Radite na snazi ruke i zapešća za jače udarce.",
    neprecizno: "Smashovi su previše neprecizni. Fokusirajte se na jednu točku i ciljajte niže prema protivničkom terenu.",
    greskalob: "Previše lob udaraca završava izvan terena. Ciljajte dublje, ali s većom kontrolom.",   
    vracanje: "Vaši udarci često završavaju u središtu protivničkog terena. Ciljajte kutove ili blizu mreže za učinkovitiju igru.",   
    zapesce: "Previše pokrećete zapešće prilikom udarca što smanjuje preciznost. Pokušajte stabilnije držanje.", 
    ravnoteza: "Gubite ravnotežu prilikom udaraca. Radite na održavanju čvrstog stava i stabilne baze dok izvodite udarce.",
    koordinacija: "Vaši udarci i kretanje nisu usklađeni. Pokušajte sinkronizirati pokrete ruku i nogu za veću učinkovitost.", 
    koncentracija: "Gubite fokus prilikom ključnih udaraca. Usredotočite se na tehniku i kontrolu prilikom svakog udarca.",  
    strpljenje: "Prebrzo pokušavate završiti poen. Budite strpljiviji i čekajte pravu priliku za napad.",  
    pritisak: "Pod pritiskom često griješite. Pokušajte kontrolirati tempo igre i smireno donositi odluke.",
  };

 /* ZAMIJENITI S PODACIMA SA SENZORA
    const checkSensorData = () => {
    const randomTipKey = Object.keys(sensorTips)[Math.floor(Math.random() * Object.keys(sensorTips).length)];
    setSensorMessage(sensorTips[randomTipKey]);
    setShowMessage(true);
  };*/

  useEffect(() => {
    const interval = setInterval(() => {
      checkSensorData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Napredni savjeti</Text>
      {showMessage && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{sensorMessage}</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.dismissButton}
        onPress={() => setShowMessage(false)}
      >
        <Text style={styles.buttonText}>Zatvori poruku</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  messageContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  messageText: {
    fontSize: 16,
    textAlign: 'center',
  },
  dismissButton: {
    backgroundColor: '#2a2f34',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NapredniScreen;