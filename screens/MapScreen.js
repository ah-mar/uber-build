import { TouchableOpacity, View } from "react-native";
import Map from "../components/Map";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../components/NavigateCard";
import { SafeAreaView } from "react-native-safe-area-context";
import RideOptionsCard from "../components/RideOptionsCard";
import { Icon } from "@rneui/themed";

const MapScreen = () => {
  const navigator = useNavigation();
  const MapStack = createNativeStackNavigator();

  return (
    <SafeAreaView
      className="bg-white flex-grow"
      edges={["bottom", "left", "right"]}
    >
      <TouchableOpacity
        onPress={() => navigator.navigate("Home")}
        className="absolute top-16 left-8 bg-gray-100 z-50 p-3 rounded-full shadow-lg"
      >
        <Icon name="menu" />
      </TouchableOpacity>
      <View className="h-1/2">
        <Map />
      </View>
      <View className="h-1/2">
        <MapStack.Navigator>
          <MapStack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{ headerShown: false }}
          />
          <MapStack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{ headerShown: false }}
          />
        </MapStack.Navigator>
      </View>
    </SafeAreaView>
  );
};
export default MapScreen;
