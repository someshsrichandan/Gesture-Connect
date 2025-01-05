import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageSourcePropType,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

interface SignLanguageOption {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

const Learn: React.FC = () => {
  const router = useRouter();

  const signLanguageOptions: SignLanguageOption[] = [
    {
      id: 'asl',
      title: 'American Sign Language (ASL)',
      image: require('../assets/signs/letters/a.jpg'),
    },
    {
      id: 'isl',
      title: 'Indian Sign Language (ISL)',
      image: require('../assets/signs/letters/b.jpg'),
    },
  ];

  const handleOptionPress = (option: SignLanguageOption) => {
    router.push(`/${option.id}`);
  };

  const LanguageOption: React.FC<{
    option: SignLanguageOption;
    onPress: () => void;
  }> = ({ option, onPress }) => (
    <TouchableOpacity style={styles.optionCard} onPress={onPress}>
      <Image source={option.image} style={styles.optionImage} resizeMode="cover" />
      <Text style={styles.optionTitle}>{option.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Learn</Text>

        <View style={styles.optionsContainer}>
          {signLanguageOptions.map((option) => (
            <LanguageOption key={option.id} option={option} onPress={() => handleOptionPress(option)} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 16,
  },
  optionImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    padding: 12,
    textAlign: 'center',
  },
});

export default Learn;
