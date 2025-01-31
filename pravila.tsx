import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const RulesScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Pravila badmintona</Text>
      </View>

      <View style={styles.ruleContainer}>
        <Text style={styles.rule}>
          <Text style={styles.boldText}>1. </Text>
          {'Brojenje rezultata: Meč se igra na dva dobivena gema do 21 boda. Strana koja je osvojila poen dodaje bod svome rezultatu.'}
        </Text>
        <Text style={styles.rule}>
          {'Kod '}
          <Text style={styles.boldText}>20:20</Text>
          {' strana koja prva ostvari dva boda razlike osvaja gem.'}
        </Text>
        <Text style={styles.rule}>
          {'Kod '}
          <Text style={styles.boldText}>29:29</Text>
          {' strana koja osvoji '}
          <Text style={styles.boldText}>30. bod</Text>
          {' osvaja gem.'}
        </Text>
        <Text style={styles.rule}>
          {'Strana koja osvoji gem servira prva u idućem gemu.'}
        </Text>
      </View>

      <View style={styles.ruleContainer}>
        <Text style={styles.rule}>
          <Text style={styles.boldText}>2. </Text>
          {'Stanka i promjena strana: Kad vodeća strana osvoji '}
          <Text style={styles.boldText}>11. bod</Text>
          {', igrači imaju stanku od 60 sekundi.'}
        </Text>
        <Text style={styles.rule}>
          {'Između gemova dopuštena je stanka od 2 minute.'}
        </Text>
        <Text style={styles.rule}>
          {'U trećem gemu igrači mijenjaju strane kad vodeća strana dosegne '}
          <Text style={styles.boldText}>11 bodova</Text>
          {'.'}
        </Text>
      </View>

      <View style={styles.ruleContainer}>
        <Text style={styles.rule}>
          <Text style={styles.boldText}>3. </Text>
          {'Pojedinci: U početku gema ('}
          <Text style={styles.boldText}>0:0</Text>
          {') i kod parnoga broja serverovih bodova, server početni udarac izvodi iz desnoga servisnoga polja.'}
        </Text>
        <Text style={styles.rule}>
          {'Kad je serverov broj bodova neparan, server početni udarac izvodi iz lijevoga servisnog polja.'}
        </Text>
        <Text style={styles.rule}>
          {'Ako server osvoji poen, dobiva bod i potom servira iz drugoga servisnoga polja.'}
        </Text>
        <Text style={styles.rule}>
          {'Ako primatelj osvoji poen, onda on dobiva bod i postaje novim serverom.'}
        </Text>
        <Text style={styles.rule}>
          {'Servira iz odgovarajućega servisnoga polja - lijevoga ako je njegov rezultat neparan, a desnoga ako je paran.'}
        </Text>
      </View>

      <View style={styles.ruleContainer}>
        <Text style={styles.rule}>
          <Text style={styles.boldText}>4. </Text>
          {'Parovi: Pravo na servis u svakoj izmjeni ima samo jedan član para.'}
        </Text>
        <Text style={styles.rule}>
          {'Na početku gema i kod parnoga rezultata, server početni udarac izvodi iz desnoga servisnoga polja.'}
        </Text>
        <Text style={styles.rule}>
          {'Kod neparnoga rezultata servis se izvodi iz lijevoga servisnog polja.'}
        </Text>
        <Text style={styles.rule}>
          {'Ako serverova strana osvoji poen, ona dobiva bod i potom isti server servira iz drugoga servisnoga polja.'}
        </Text>
        <Text style={styles.rule}>
          {'Ako primateljska strana osvoji poen, onda ona dobiva bod.'}
        </Text>
        <Text style={styles.rule}>
          {'Primateljska strana postaje nova serverska strana.'}
        </Text>
        <Text style={styles.rule}>
          {'Igrači ne mijenjaju pripadajuća servisna polja sve dok ne osvoje poen za svoj servis.'}
        </Text>
        <Text style={styles.rule}>
          {'Ako igrači greškom zamijene servisna polja, greška se treba ispraviti čim se otkrije.'}
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
    color: '#000000',  
  },
  ruleContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rule: {
    fontSize: 18,
    color: '#000000',  
    marginBottom: 8,    
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000000',  
  },
});

export default RulesScreen;