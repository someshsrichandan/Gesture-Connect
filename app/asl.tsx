import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';

const ASL = () => {
  const [activeTab, setActiveTab] = useState<'Alphabet' | 'Numbers' | 'Greetings'>('Alphabet');

  const aslResources = [
    {
      id: '1',
      title: 'ASL - Basics for Beginners',
      url: 'https://www.youtube.com/watch?v=example-link-1',
    },
    {
      id: '2',
      title: 'ASL - Learn the Alphabet',
      url: 'https://www.youtube.com/watch?v=example-link-2',
    },
    {
      id: '3',
      title: 'ASL - Common Words and Phrases',
      url: 'https://www.youtube.com/watch?v=example-link-3',
    },
    {
      id: '4',
      title: 'American Sign Language Dictionary',
      url: 'https://www.signingsavvy.com/',
    },
  ];

  const renderPlaceholder = (tabName: string) => (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>
        {tabName} content is not available yet. Stay tuned!
      </Text>
    </View>
  );

  const getActiveTabContent = () => {
    switch (activeTab) {
      case 'Alphabet':
        return renderPlaceholder('Alphabet');
      case 'Numbers':
        return renderPlaceholder('Numbers');
      case 'Greetings':
        return renderPlaceholder('Greetings');
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>American Sign Language</Text>
        </View>

        {/* Resources Section */}
        <View style={styles.resourcesSection}>
          <Text style={styles.sectionTitle}>ASL Resources</Text>
          {aslResources.map(({ id, title, url }) => (
            <TouchableOpacity
              key={id}
              style={styles.resourceButton}
              onPress={() => Linking.openURL(url)}
            >
              <Text style={styles.resourceButtonText}>{title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Alphabet' && styles.activeTabButton]}
            onPress={() => setActiveTab('Alphabet')}
          >
            <Text
              style={[styles.tabButtonText, activeTab === 'Alphabet' && styles.activeTabButtonText]}
            >
              Alphabet
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Numbers' && styles.activeTabButton]}
            onPress={() => setActiveTab('Numbers')}
          >
            <Text
              style={[styles.tabButtonText, activeTab === 'Numbers' && styles.activeTabButtonText]}
            >
              Numbers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Greetings' && styles.activeTabButton]}
            onPress={() => setActiveTab('Greetings')}
          >
            <Text
              style={[styles.tabButtonText, activeTab === 'Greetings' && styles.activeTabButtonText]}
            >
              Greetings
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>{getActiveTabContent()}</View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  resourcesSection: {
    padding: 20,
    backgroundColor: '#F9F9F9',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  resourceButton: {
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  resourceButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F7F7F7',
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#EEE',
  },
  activeTabButton: {
    backgroundColor: '#007AFF',
  },
  tabButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  activeTabButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  placeholderText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default ASL;
