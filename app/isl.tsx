import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';

const { width } = Dimensions.get('window');

const ISL = () => {
  const [activeTab, setActiveTab] = useState<'Alphabet' | 'Numbers' | 'Greetings'>('Alphabet');

  const alphabetImages = [
    { id: 'A', image: require('../assets/signs/letters/a.jpg') },
    { id: 'B', image: require('../assets/signs/letters/b.jpg') },
    { id: 'C', image: require('../assets/signs/letters/c.jpg') },
    { id: 'D', image: require('../assets/signs/letters/d.jpg') },
    { id: 'E', image: require('../assets/signs/letters/e.jpg') },
    { id: 'F', image: require('../assets/signs/letters/f.jpg') },
    { id: 'G', image: require('../assets/signs/letters/g.jpg') },
    { id: 'H', image: require('../assets/signs/letters/h.jpg') },
    { id: 'I', image: require('../assets/signs/letters/i.jpg') },
    { id: 'J', image: require('../assets/signs/letters/j.jpg') },
  ];

  const learningLinks = [
    {
      id: '1',
      title: 'Learn ISL - Introduction',
      url: 'https://islrtc.nic.in/online-basic-isl-course-in-self-learning-mode/#:~:text=Indian%20Sign%20Language%20(ISL)%20is,parents%2C%20siblings%2C%20and%20interpreters',
    },
    {
      id: '2',
      title: 'ISL - Alphabet Signs',
      url: 'https://youtube.com/playlist?list=PLxYMaKXKMMcMgg4f47WkG7AM0bb3AyjTi&si=mLOnVjo289SwwjFZ',
    },
    {
      id: '3',
      title: 'ISL - Basic Words',
      url: 'https://youtube.com/shorts/d_kEHq0kDdA?si=nRIrHxLtsxbao859',
    },
  ];

  const externalLinks = [
    {
      id: '1',
      title: 'ISLRTC - Indian Sign Language Research and Training Center',
      url: 'https://islrtc.nic.in/',
    },
    {
      id: '2',
      title: 'National Association of the Deaf',
      url: 'http://nadindia.org/',
    },
  ];

  const renderAlphabetGrid = () => (
    <View style={styles.grid}>
      {alphabetImages.map(({ id, image }) => (
        <View key={id} style={styles.gridItem}>
          <Image source={image} style={styles.gridImage} resizeMode="contain" />
          <Text style={styles.gridText}>{id}</Text>
        </View>
      ))}
    </View>
  );

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
        return renderAlphabetGrid();
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
        {/* Learning Resources */}
        <View style={styles.resourcesSection}>
          <Text style={styles.sectionTitle}>Learning Resources</Text>
          {learningLinks.map(({ id, title, url }) => (
            <TouchableOpacity
              key={id}
              style={styles.linkButton}
              onPress={() => Linking.openURL(url)}
            >
              <Text style={styles.linkText}>{title}</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.sectionTitle}>More Resources</Text>
          {externalLinks.map(({ id, title, url }) => (
            <TouchableOpacity
              key={id}
              style={styles.linkButton}
              onPress={() => Linking.openURL(url)}
            >
              <Text style={styles.linkText}>{title}</Text>
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
    backgroundColor: '#FFF', // White background
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
  linkButton: {
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  linkText: {
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  gridItem: {
    width: (width - 60) / 2,
    alignItems: 'center',
    marginBottom: 20,
  },
  gridImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: '#EEE',
  },
  gridText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
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

export default ISL;
