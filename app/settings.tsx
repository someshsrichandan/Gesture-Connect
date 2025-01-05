import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import Slider from "@react-native-community/slider";
import { AntDesign } from "@expo/vector-icons";

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

    const SettingsItem: React.FC<{
        title: string;
        onPress: () => void;
        color?: string;
    }> = ({ title, onPress, color = "#000" }) => (
        <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
            <Text style={[styles.settingsItemText, { color }]}>{title}</Text>
            <AntDesign name="right" size={20} color="#666" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Settings</Text>

                <View style={styles.section}>
                    <Text style={styles.settingsItemText}>Change Text Size</Text>
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

                <SettingsItem title="Change Theme" onPress={onThemeChange} />

                <View style={styles.divider} />

                <SettingsItem title="Rate Us" onPress={onRateUs} />

                <View style={styles.divider} />

                <SettingsItem title="Delete Account" onPress={onDeleteAccount} color="#FF6B6B" />

                <View style={styles.divider} />

                <View style={styles.versionContainer}>
                    <Text style={styles.versionLabel}>App version:</Text>
                    <Text style={styles.versionNumber}>{appVersion}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

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