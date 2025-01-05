import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";

// Define the interface for a sign
interface Sign {
    id: string;
    name: string;
    description: string;
    image: any; // You can also use ImageSourcePropType from 'react-native' for stricter typing
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
    // Add more recent signs as needed
];

export default function Dictionary() {
    const [recentSigns] = useState<Sign[]>(recentSignsData);

    const renderSignItem = ({ item }: { item: Sign }) => (
        <TouchableOpacity style={styles.signItem}>
            <Image source={item.image} style={styles.signImage} />
            <View>
                <Text style={styles.signName}>{item.name}</Text>
                <Text>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Dictionary</Text>
            <View style={styles.recentContainer}>
                <Text style={styles.recentTitle}>Recently Used Signs</Text>
                <FlatList
                    data={recentSigns}
                    keyExtractor={(item) => item.id}
                    renderItem={renderSignItem}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 16,
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
    },
    recentContainer: {
        width: "100%",
        marginTop: 20,
    },
    recentTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    listContainer: {
        paddingBottom: 100,
    },
    signItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "row",
        alignItems: "center",
    },
    signImage: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
    signName: {
        fontWeight: "bold",
        fontSize: 18,
    },
});
