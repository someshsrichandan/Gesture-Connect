import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { AntDesign, Ionicons } from "@expo/vector-icons";

interface SettingsProps {
    onThemeChange: () => void;
    onRateUs: () => void;
    onDeleteAccount: () => void;
    appVersion: string;
}

const Settings: React.FC<SettingsProps> = ({
    onThemeChange,
    onRateUs,
    onDeleteAccount,
    appVersion = "1.0.0",
}) => {
    const [textSize, setTextSize] = useState<number>(0.5);
    const [serverUrl, setServerUrl] = useState<string>("");

    // Load saved settings
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const storedUrl = await AsyncStorage.getItem("serverUrl");
                if (storedUrl) setServerUrl(storedUrl);
            } catch (error) {
                console.error("Error loading settings:", error);
            }
        };
        loadSettings();
    }, []);

    // Save Server URL
    const saveServerUrl = async () => {
        
        try {
            await AsyncStorage.setItem("serverUrl", serverUrl);
            Alert.alert("Success", "WebSocket server URL saved!");
        } catch (error) {
            console.error("Error saving server URL:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Settings</Text>

                {/* WebSocket Server URL Input */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>WebSocket Server</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="globe-outline" size={22} color="#3f51b5" />
                        <TextInput
                            style={styles.input}
                            value={serverUrl}
                            onChangeText={setServerUrl}
                            placeholder="Enter WebSocket URL"
                            keyboardType="url"
                            autoCapitalize="none"
                        />
                    </View>
                    <TouchableOpacity style={styles.saveButton} onPress={saveServerUrl}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.divider} />

                {/* Change Text Size */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Change Text Size</Text>
                    <Slider
                        style={styles.slider}
                        value={textSize}
                        onValueChange={setTextSize}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#2196F3"
                        maximumTrackTintColor="#DEDEDE"
                        thumbTintColor="#2196F3"
                    />
                </View>

                <View style={styles.divider} />

                {/* Other Settings Options */}
                <SettingsItem title="Change Theme" onPress={onThemeChange} />
                <View style={styles.divider} />
                <SettingsItem title="Rate Us" onPress={onRateUs} />
                <View style={styles.divider} />
                <SettingsItem title="Delete Account" onPress={onDeleteAccount} color="#FF6B6B" />
                <View style={styles.divider} />

                {/* App Version */}
                <View style={styles.versionContainer}>
                    <Text style={styles.versionLabel}>App version:</Text>
                    <Text style={styles.versionNumber}>{appVersion}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

// Reusable Settings Item Component
const SettingsItem: React.FC<{ title: string; onPress: () => void; color?: string }> = ({ title, onPress, color = "#000" }) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
        <Text style={[styles.settingsItemText, { color }]}>{title}</Text>
        <AntDesign name="right" size={20} color="#666" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 32,
        color: "#000",
    },
    section: {
        marginBottom: 24,
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3, // Shadow for Android
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 8,
        color: "#333",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F7F7F7",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#DDD",
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 10,
        color: "#333",
    },
    saveButton: {
        backgroundColor: "#3f51b5",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    settingsItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
    },
    settingsItemText: {
        fontSize: 16,
        color: "#000",
    },
    slider: {
        marginTop: 8,
        width: "100%",
        height: 40,
    },
    divider: {
        height: 1,
        backgroundColor: "#EEEEEE",
        marginVertical: 4,
    },
    versionContainer: {
        flexDirection: "row",
        marginTop: 24,
    },
    versionLabel: {
        fontSize: 16,
        color: "#000",
    },
    versionNumber: {
        fontSize: 16,
        color: "#666",
        marginLeft: 4,
    },
});

export default Settings;
