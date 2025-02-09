import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from '@/firebaseConfig';
import { User } from 'firebase/auth';
import { BleManager, Device } from 'react-native-ble-plx';

const auth = getAuth(app);
const bleManager = new BleManager();

export default function PostavkeScreen() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Greška', 'Lozinke se ne podudaraju.');
      return;
    }
    if (email && password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        Alert.alert('Registracija uspješna!', `Dobrodošli, ${userCredential.user.email}!`);
      } catch (error: unknown) {
        if (error instanceof Error) {
          Alert.alert('Greška', error.message);
        } else {
          Alert.alert('Greška', 'Nepoznata greška.');
        }
      }
    } else {
      Alert.alert('Greška', 'Molimo unesite email i lozinku.');
    }
  };

  const handleLogin = async () => {
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        Alert.alert('Prijava uspješna!', `Dobrodošli, ${userCredential.user.email}!`);
      } catch (error: unknown) {
        if (error instanceof Error) {
          Alert.alert('Greška', error.message);
        } else {
          Alert.alert('Greška', 'Nepoznata greška.');
        }
      }
    } else {
      Alert.alert('Greška', 'Molimo unesite email i lozinku.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setConnectedDevice(null);
      Alert.alert('Odjavljeni ste.', 'Vidimo se uskoro!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Greška', error.message);
      } else {
        Alert.alert('Greška', 'Nepoznata greška.');
      }
    }
  };

  const handleConnectRacket = async () => {
    try {
      bleManager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          Alert.alert('Greška', 'Povezivanje nije uspjelo.');
          return;
        }
        if (device && (device.name?.includes('Arduino') || device.localName?.includes('Arduino'))) {
          bleManager.stopDeviceScan();
          device.connect()
            .then((device) => {
              setConnectedDevice(device);
              Alert.alert('Povezivanje uspješno', 'Reket je povezan.');
            })
            .catch((error) => {
              Alert.alert('Greška', 'Povezivanje nije uspjelo.');
            });
        }
      });
    } catch (error) {
      Alert.alert('Greška', 'Povezivanje nije uspjelo.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Postavke</ThemedText>
      </View>

      <View style={styles.formContainer}>
        {user ? (
          <View>
            <ThemedText type="subtitle">Podaci o računu</ThemedText>
            <ThemedText>Prijavljeni ste s: {user.email}</ThemedText>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Odjavi se</Text>
            </TouchableOpacity>

            <ThemedText type="subtitle">Povezivanje reketa</ThemedText>
            <Text>{connectedDevice ? `Povezan s: ${connectedDevice.name}` : 'Reket nije povezan.'}</Text>
            <TouchableOpacity style={styles.button} onPress={handleConnectRacket}>
              <Text style={styles.buttonText}>Poveži reket</Text>
            </TouchableOpacity>
          </View>
        ) : isRegistering ? (
          <View>
            <ThemedText type="subtitle">Registracija</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Lozinka"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Potvrdite lozinku"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Registrirajte se</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsRegistering(false)}>
              <Text style={styles.switchText}>Imate račun? Prijavite se ovdje.</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <ThemedText type="subtitle">Prijava</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Lozinka"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Prijavite se</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsRegistering(true)}>
              <Text style={styles.switchText}>Nemate račun? Registrirajte se ovdje.</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  titleContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    height: 50,
    fontSize: 18,
    borderColor: '#ccc',
    borderWidth: 1.5,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#2a2f34',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  switchText: {
    color: '#2a2f34',
    marginTop: 12,
    textAlign: 'center',
  },
});
