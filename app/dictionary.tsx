import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
} from "react-native";

// Define the interface for a sign
interface Sign {
    id: string;
    name: string;
    description: string;
    image: any; // Use ImageSourcePropType from 'react-native' for stricter typing if preferred
}

// Sample data for recently used signs with images
const recentSignsData: Sign[] = [
    {
        id: "1",
        name: "A",
        description: "Letter A in sign language",
        image: require("../assets/signs/letters/a.jpg"),
    },
    {
        id: "2",
        name: "B",
        description: "Letter B in sign language",
        image: require("../assets/signs/letters/b.jpg"),
    },
    {
        id: "3",
        name: "C",
        description: "Letter C in sign language",
        image: require("../assets/signs/letters/c.jpg"),
    },
    {
        id: "3",
        name: "Morning",
        description: "Word Morning in sign language",
        image: require("../assets/signs/letters/morning.gif"),
    },
    // Add more recent signs as needed
];

export default function Dictionary() {
    const [recentSigns] = useState<Sign[]>(recentSignsData);

    const renderSignItem = ({ item }: { item: Sign }) => (
        <TouchableOpacity style={styles.signCard}>
            <Image source={item.image} style={styles.signImage} />
            <View style={styles.signDetails}>
                <Text style={styles.signName}>{item.name}</Text>
                <Text style={styles.signDescription}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>Sign Language Dictionary</Text>
            <View style={styles.recentContainer}>
                <Text style={styles.recentTitle}>Frequently Used Signs</Text>
                <FlatList
                    data={recentSigns}
                    keyExtractor={(item) => item.id}
                    renderItem={renderSignItem}
                    contentContainerStyle={styles.listContainer}
                    scrollEnabled={false} // Disable scrolling as it's wrapped in ScrollView
                />
            </View>
        </ScrollView>
    );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        paddingHorizontal: 16,
    },
    headerText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginVertical: 20,
    },
    recentContainer: {
        width: "100%",
        marginTop: 10,
    },
    recentTitle: {
        fontSize: 22,
        fontWeight: "600",
        color: "#555",
        marginBottom: 12,
    },
    listContainer: {
        paddingBottom: 20,
    },
    signCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        marginVertical: 8,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, // For Android shadow
    },
    signImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 16,
    },
    signDetails: {
        flex: 1,
    },
    signName: {
        fontSize: 20,
        fontWeight: "700",
        color: "#333",
        marginBottom: 4,
    },
    signDescription: {
        fontSize: 16,
        color: "#666",
    },
});
