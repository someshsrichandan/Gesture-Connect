import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageSourcePropType,
} from 'react-native';

interface SignLanguageOption {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

const Learn: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageSourcePropType | null>(null);
  const router = useRouter();

  const signLanguageOptions: SignLanguageOption[] = [
    {
      id: 'asl',
      title: 'ASL',
      image: require('../assets/signs/letters/a.jpg'),
    },
    {
      id: 'isl',
      title: 'ISL',
      image: require('../assets/signs/letters/b.jpg'),
    },
  ];

  const handleOptionPress = (option: SignLanguageOption) => {
    setSelectedImage(option.image);
    if (option.id === 'asl') {
      router.push('/asl');
    } else if (option.id === 'isl') {
      router.push('/isl');
    }
  };

  const LanguageOption: React.FC<{
    option: SignLanguageOption;
    onPress: () => void;
  }> = ({ option, onPress }) => (
    <View style={styles.optionContainer}>
      <TouchableOpacity 
        style={styles.imageContainer} 
        onPress={onPress}
      >
        <Image
          source={option.image}
          style={styles.optionImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.optionTitle}>{option.title}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Learn</Text>
        
        <View style={styles.optionsContainer}>
          {signLanguageOptions.map((option) => (
            <LanguageOption
              key={option.id}
              option={option}
              onPress={() => handleOptionPress(option)}
            />
          ))}
        </View>

        {selectedImage && (
          <View style={styles.selectedImageContainer}>
            <Image
              source={selectedImage}
              style={styles.selectedImage}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#000',
  },
  optionsContainer: {
    gap: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 16 / 9,
    backgroundColor: '#E5E5E5',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
  },
  optionImage: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  selectedImageContainer: {
    flex: 1,
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
});

export default Learn;