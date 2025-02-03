import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>O nama</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {'Mi smo mali tim iz Radoboja, mjesta pored Krapine. Ove školske godine odlučili smo napraviti projekt kakav još nije viđen – '}
          <Text style={styles.boldText}>AceMotion</Text>
          {'. Sve je to započelo idejom, a završilo gotovim projektom koji upravo sada i gledate. Nudimo učenje osnova badmintona, ali i analiziranje i poboljšanje igre onih koji su se njime već upoznali.'}
        </Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          <Text style={styles.boldText}>Vizija</Text>
          {' – želimo biti vodeća sportska aplikacija u Krapinsko-zagorskoj županiji i šire.\n\n'}
          <Text style={styles.boldText}>Misija</Text>
          {' – Mi smo:\n'}
          <Text style={styles.boldText}>- </Text>
          {'učenici koji žele olakšati učenje badmintona\n'}
          <Text style={styles.boldText}>- </Text>
          {'istraživači koji ulaze u inovativne pothvate za poboljšanje informacijske tehnologije\n'}
          <Text style={styles.boldText}>- </Text>
          {'mladi koji žele doprinijeti ljudskom zdravlju.\n\n'}
          {'Osigurat ćemo kvalitetno učenje i sigurno okruženje u kojem postoji balans zabave i istraživanja. Želimo Vam sretno učenje!'}
        </Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {'Članovi '}
          <Text style={styles.boldText}>AceMotion</Text>
          {' tima, '}
          <Text style={styles.boldText}>Luka Cerovečki</Text>
          {' i '}
          <Text style={styles.boldText}>Emil Cigula</Text>
          {' te mentor '}
          <Text style={styles.boldText}>Stjepan Šalković</Text>
          {'.'}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8', 
  },
  titleContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',  
  },
  descriptionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  description: {
    fontSize: 18,
    color: '#000000',  
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000000',  
  },
});

export default AboutScreen;
