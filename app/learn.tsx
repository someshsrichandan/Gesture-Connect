import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    ImageSourcePropType,
} from "react-native";

// Interfaces
interface Sign {
    id: string;
    name: string;
    description: string;
    image: ImageSourcePropType;
}

interface LanguageTabProps {
    title: string;
    isActive: boolean;
    onPress: () => void;
}

interface SignCardProps {
    sign: Sign;
}

// Sample data
const islSignsData: Sign[] = [
    {
        id: "1",
        name: "A",
        description: "Letter A in ISL",
        image: require("../assets/signs/letters/a.jpg"),
    },
    {
        id: "2",
        name: "B",
        description: "Letter B in ISL",
        image: require("../assets/signs/letters/b.jpg"),
    },
    {
        id: "3",
        name: "C",
        description: "Letter C in ISL",
        image: require("../assets/signs/letters/c.jpg"),
    },
];

const aslSignsData: Sign[] = [
    {
        id: "1",
        name: "A",
        description: "Letter A in ASL",
        image: require("../assets/signs/letters/a.jpg"),
    },
    {
        id: "2",
        name: "B",
        description: "Letter B in ASL",
        image: require("../assets/signs/letters/b.jpg"),
    },
    {
        id: "3",
        name: "C",
        description: "Letter C in ASL",
        image: require("../assets/signs/letters/c.jpg"),
    },
];

type LanguageType = "ISL" | "ASL";

const LanguageTab: React.FC<LanguageTabProps> = ({ title, isActive, onPress }) => (
    <TouchableOpacity style={[styles.tab, isActive && styles.activeTab]} onPress={onPress}>
        <Text style={[styles.tabText, isActive && styles.activeTabText]}>{title}</Text>
    </TouchableOpacity>
);

const SignCard: React.FC<SignCardProps> = ({ sign }) => (
    <View style={styles.card}>
        <Image source={sign.image} style={styles.signImage} />
        <View style={styles.cardContent}>
            <Text style={styles.signName}>{sign.name}</Text>
            <Text style={styles.signDescription}>{sign.description}</Text>
        </View>
    </View>
);

const Learn: React.FC = () => {
    const [activeLanguage, setActiveLanguage] = useState<LanguageType>("ISL");

    const getSignsData = (language: LanguageType): Sign[] => {
        return language === "ISL" ? islSignsData : aslSignsData;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Sign Language</Text>
                <Text style={styles.subtitle}>Learn and Practice</Text>
            </View>

            <View style={styles.tabContainer}>
                <LanguageTab
                    title="ISL"
                    isActive={activeLanguage === "ISL"}
                    onPress={() => setActiveLanguage("ISL")}
                />
                <LanguageTab
                    title="ASL"
                    isActive={activeLanguage === "ASL"}
                    onPress={() => setActiveLanguage("ASL")}
                />
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.gridContainer}>
                    {getSignsData(activeLanguage).map((sign) => (
                        <SignCard key={sign.id} sign={sign} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
    },
    header: {
        padding: 20,
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E9F2",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#2E3A59",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#8F9BB3",
        textAlign: "center",
        marginTop: 4,
    },
    tabContainer: {
        flexDirection: "row",
        padding: 16,
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E9F2",
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        marginHorizontal: 4,
        borderRadius: 8,
        backgroundColor: "#F5F7FA",
        alignItems: "center",
    },
    activeTab: {
        backgroundColor: "#3366FF",
    },
    tabText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2E3A59",
    },
    activeTabText: {
        color: "#FFF",
    },
    content: {
        flex: 1,
    },
    gridContainer: {
        padding: 16,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    signImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
    },
    cardContent: {
        marginLeft: 16,
        flex: 1,
    },
    signName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2E3A59",
        marginBottom: 4,
    },
    signDescription: {
        fontSize: 14,
        color: "#8F9BB3",
    },
});

export default Learn;
