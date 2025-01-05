import { Stack, Link } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, TouchableOpacity } from "react-native";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Home",
                    headerRight: () => {
                        return (
                            <Link href="/profile">
                                <TouchableOpacity hitSlop={20}>
                                    <MaterialIcons name="account-circle" size={40} color="black" />
                                </TouchableOpacity>
                            </Link>
                        );
                    },
                }}
            />
            <Stack.Screen name="audiotosign" options={{ title: "Audio To Sign" }} />
            <Stack.Screen name="texttosign" options={{ title: "Text To Sign" }} />
            <Stack.Screen name="signtotext" options={{ title: "Sign To Text" }} />
            <Stack.Screen name="learn" options={{ title: "Learn" }} />
            <Stack.Screen name="settings" options={{ title: "Settings" }} />
            <Stack.Screen name="dictionary" options={{ title: "Dictionary" }} />
        </Stack>
    );
}
