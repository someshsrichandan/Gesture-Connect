import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from "react-native";

interface ProfileDetailsProps {
    onEdit: () => void;
    onLogout: () => void;
}

interface ProfileData {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ onEdit, onLogout }) => {
    const [profileData] = React.useState<ProfileData>({
        firstName: "Piya",
        lastName: "Sharma",
        email: "piyasharma@gmail.com",
        mobile: "",
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Profile Details</Text>

                <View style={styles.avatarContainer}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={require("../assets/images/user.png")}
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={styles.editAvatarButton}>
                            <Image
                                source={require("../assets/images/user.png")}
                                style={styles.refreshIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputsContainer}>
                    <TextInput
                        style={styles.input}
                        value={profileData.firstName}
                        editable={false}
                        placeholder="First Name"
                    />
                    <TextInput
                        style={styles.input}
                        value={profileData.lastName}
                        editable={false}
                        placeholder="Last Name"
                    />
                    <TextInput
                        style={styles.input}
                        value={profileData.email}
                        editable={false}
                        placeholder="Email"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        value={profileData.mobile}
                        editable={false}
                        placeholder="Mobile"
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                        <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF8F0",
    },
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "left",
        marginBottom: 24,
        color: "#333",
    },
    avatarContainer: {
        alignItems: "center",
        marginBottom: 32,
    },
    avatarWrapper: {
        position: "relative",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#E1E1E1",
    },
    editAvatarButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#FFF",
        borderRadius: 15,
        padding: 6,
        borderWidth: 1,
        borderColor: "#E1E1E1",
    },
    refreshIcon: {
        width: 18,
        height: 18,
    },
    inputsContainer: {
        marginBottom: 24,
    },
    input: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#E1E1E1",
        color: "#333",
    },
    buttonContainer: {
        gap: 12,
    },
    editButton: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E1E1E1",
    },
    editButtonText: {
        color: "#333",
        fontSize: 16,
        fontWeight: "500",
    },
    logoutButton: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E1E1E1",
    },
    logoutButtonText: {
        color: "#333",
        fontSize: 16,
        fontWeight: "500",
    },
});

export default ProfileDetails;