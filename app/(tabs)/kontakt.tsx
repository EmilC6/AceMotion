import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function KontaktScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (name && email && message) {
      setLoading(true);
      try {
        const response = await fetch('https://ace-motion.vercel.app/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, message }),
        });

        const data = await response.json();

        if (response.ok) {
          Alert.alert('Poruka poslana!', data.message);
          setName('');
          setEmail('');
          setMessage('');
        } else {
          Alert.alert('Greška!', data.message || 'Došlo je do problema.');
        }
      } catch (error) {
        Alert.alert('Greška!', 'Nije moguće poslati poruku. Pokušajte kasnije.');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Molimo popunite sva polja.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Kontaktirajte nas</ThemedText>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ime i prezime"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Adresa elektroničke pošte"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.textArea}
          placeholder="Poruka"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={5}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Šalje se...' : 'Pošalji'}</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,  
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  titleContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,  
    paddingVertical: 12,  
    paddingHorizontal: 24,  
    alignSelf: 'center',
    marginBottom: 20,  
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
  textArea: {
    height: 120,  
    fontSize: 18,  
    borderColor: '#ccc',
    borderWidth: 1.5,
    marginBottom: 20,  
    paddingHorizontal: 12,
    textAlignVertical: 'top',
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
});