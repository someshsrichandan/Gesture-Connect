import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';

const { width } = Dimensions.get('window');


type SignItem = {
  type: 'word' | 'letter';
  content: string;
  sign: ImageSourcePropType;
};

const TextToSignAlternate = () => {
  const [text, setText] = useState<string>('');
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal'); // slow, normal, fast

  
  const signDictionary: Record<string, ImageSourcePropType> = {
    'a': require('../assets/signs/letters/a.jpg'),
    'b': require('../assets/signs/letters/b.jpg'),
    'c': require('../assets/signs/letters/c.jpg'),
    'd': require('../assets/signs/letters/d.jpg'),
    'e': require('../assets/signs/letters/e.jpg'),
    'f': require('../assets/signs/letters/f.jpg'),
    'g': require('../assets/signs/letters/g.jpg'),
    'h': require('../assets/signs/letters/h.jpg'),
    'i': require('../assets/signs/letters/i.jpg'),
    'j': require('../assets/signs/letters/j.jpg'),
    'k': require('../assets/signs/letters/k.jpg'),
    'l': require('../assets/signs/letters/l.jpg'),
    'm': require('../assets/signs/letters/m.jpg'),
    'n': require('../assets/signs/letters/n.jpg'),
    'o': require('../assets/signs/letters/o.jpg'),
    'p': require('../assets/signs/letters/p.jpg'),
    'q': require('../assets/signs/letters/q.jpg'),
    'r': require('../assets/signs/letters/r.jpg'),
    's': require('../assets/signs/letters/s.jpg'),
    't': require('../assets/signs/letters/t.jpg'),
    'u': require('../assets/signs/letters/u.jpg'),
    'v': require('../assets/signs/letters/v.jpg'),
    'w': require('../assets/signs/letters/w.jpg'),
    'x': require('../assets/signs/letters/x.jpg'),
    'y': require('../assets/signs/letters/y.jpg'),
    'z': require('../assets/signs/letters/z.jpg'),
  };


  const getSignSequence = (inputText: string): SignItem[] => {
    const words = inputText.toLowerCase().trim().split(/\s+/);
    const sequence: SignItem[] = [];

    words.forEach((word) => {
     
      if (signDictionary[word]) {
        sequence.push({
          type: 'word',
          content: word,
          sign: signDictionary[word],
        });
      } else {
        
        word.split('').forEach((letter) => {
          if (signDictionary[letter]) {
            sequence.push({
              type: 'letter',
              content: letter,
              sign: signDictionary[letter],
            });
          }
        });
      }
    });

    return sequence;
  };

 
  const togglePlay = () => {
    if (text.trim() === '') return;

    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      playSequence();
    }
  };

  
  const playSequence = () => {
    const sequence = getSignSequence(text);
    if (sequence.length === 0) return;

    const speedMap: Record<string, number> = {
      slow: 2000,
      normal: 1000,
      fast: 500,
    };

    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev >= sequence.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, speedMap[speed]);
  };

  
  const renderSignItem = ({ item }: { item: SignItem }) => (
    <View style={styles.signItem}>
      <Image
        source={item.sign}
        style={styles.signImage}
        resizeMode="contain"
      />
      <Text style={styles.signText}>{item.content}</Text>
    </View>
  );

  
  const SpeedButton = ({ title, selected, onPress }: { title: string; selected: boolean; onPress: () => void }) => (
    <TouchableOpacity
      style={[styles.speedButton, selected && styles.speedButtonSelected]}
      onPress={onPress}
    >
      <Text style={[styles.speedButtonText, selected && styles.speedButtonTextSelected]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const signs = getSignSequence(text);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Enter text to convert to sign language"
        multiline
        numberOfLines={3}
      />

      <View style={styles.controlsContainer}>
        <View style={styles.speedControls}>
          <SpeedButton title="Slow" selected={speed === 'slow'} onPress={() => setSpeed('slow')} />
          <SpeedButton title="Normal" selected={speed === 'normal'} onPress={() => setSpeed('normal')} />
          <SpeedButton title="Fast" selected={speed === 'fast'} onPress={() => setSpeed('fast')} />
        </View>

        <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
          <Text style={styles.playButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.currentSignContainer}>
        {signs.length > 0 && (
          <>
            <Image source={signs[currentWordIndex].sign} style={styles.currentSignImage} resizeMode="contain" />
            <Text style={styles.currentSignText}>{signs[currentWordIndex].content}</Text>
          </>
        )}
      </View>

      <FlatList
        data={signs}
        renderItem={renderSignItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        style={styles.signList}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  speedControls: {
    flexDirection: 'row',
  },
  speedButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  speedButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  speedButtonText: {
    color: '#666',
  },
  speedButtonTextSelected: {
    color: '#fff',
  },
  playButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  currentSignContainer: {
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  currentSignImage: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 10,
  },
  currentSignText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  signList: {
    marginTop: 20,
  },
  signItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  signImage: {
    width: 60,
    height: 60,
  },
  signText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
});

export default TextToSignAlternate;
