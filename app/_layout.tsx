import { Stack, Link } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Layout() {
    const router = useRouter();

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Home",
                    headerRight: () => {
                        return (
                            <Pressable
                                onPress={() => {
                                    router.navigate("/profile");
                                }}
                                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                            >
                                <MaterialIcons name="account-circle" size={40} color="black" />
                            </Pressable>
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
            <Stack.Screen name="emotion" options={{ title: "Emotion Detection" }} />
        </Stack>
    );
}