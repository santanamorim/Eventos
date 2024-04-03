import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import GalleryContainer from "../containers/Photos/GalleryContainer";
import CameraContainer from "../containers/Photos/CameraContainer";

const Tabs = createBottomTabNavigator();

export default function PhotosPage() {
    return (
        <Tabs.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
            <Tabs.Screen name="galeria" component={GalleryContainer} />
            <Tabs.Screen name="camera" component={CameraContainer} />
        </Tabs.Navigator>
    )
}