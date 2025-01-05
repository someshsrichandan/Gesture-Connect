//asl.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

const ASL = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>American Sign Language</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Getting Started</Text>
          <Text style={styles.text}>
            Welcome to American Sign Language (ASL). ASL is the primary language 
            used by many deaf and hard-of-hearing people in the United States 
            and Canada.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Signs</Text>
          <TouchableOpacity style={styles.lessonButton}>
            <Text style={styles.lessonButtonText}>Alphabet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lessonButton}>
            <Text style={styles.lessonButtonText}>Numbers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lessonButton}>
            <Text style={styles.lessonButtonText}>Greetings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF8F0',
    },
    header: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E5E5',
      backgroundColor: '#FFFFFF',
    },
    backButton: {
      marginBottom: 10,
    },
    backButtonText: {
      fontSize: 16,
      color: '#007AFF',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
    },
    content: {
      flex: 1,
      padding: 20,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: '#000',
      marginBottom: 12,
    },
    text: {
      fontSize: 16,
      color: '#333',
      lineHeight: 24,
    },
    lessonButton: {
      backgroundColor: '#FFFFFF',
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#E5E5E5',
    },
    lessonButtonText: {
      fontSize: 16,
      color: '#333',
      fontWeight: '500',
    },
  });
  
export default ASL;