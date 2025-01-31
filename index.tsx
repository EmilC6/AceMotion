import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const handleBeginnerPress = () => {
    console.log('Navigacija na tečaj za početnike');
  };

  const handleAdvancedPress = () => {
    console.log('Navigacija na tečaj za napredne');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.imageContainer}>
          <Image 
            source={require('@/assets/images/acemotionlogo_resized.jpg')}
            style={styles.reactLogo}
          />
        </View>
      }>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.welcomeText}>Dobro došli!</ThemedText>
        <HelloWave />
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.introText}>
          Počnite učiti već danas, bilo da ste početnik ili profesionalac! Odaberite tečaj i magija počinje.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleBeginnerPress}
          activeOpacity={0.7} 
        >
          <Link href='/Pocetnici' asChild>
            <ThemedText style={styles.buttonText}>Početnici</ThemedText>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleAdvancedPress}
          activeOpacity={0.7}
        >
          <Link href='/Napredni' asChild>
          <ThemedText style={styles.buttonText}>Napredni</ThemedText>
          </Link>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',  
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    textShadowColor: '#BDC3C7',  
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  introText: {
    fontSize: 16, 
    color: '#34495E',
    lineHeight: 24,  
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#2a2f34',
    padding: 15,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
    shadowColor: '#2C3E50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
