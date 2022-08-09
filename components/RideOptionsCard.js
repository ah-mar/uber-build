import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { useState } from "react";
import { Image } from "react-native";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectTravelDistance, selectTravelTime } from "../slices/navSlice";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png",
    costPerMile: 0.8,
    costPerMin: 0.28,
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberXL.png",
    costPerMile: 1.61,
    costPerMin: 0.3,
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.5,
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/Lux.png",
    costPerMile: 2.92,
    costPerMin: 0.75,
  },
];

const RideOptionsCard = () => {
  const navigator = useNavigation();
  const travelTime = useSelector(selectTravelTime);
  const travelDistance = useSelector(selectTravelDistance);
  const [selected, setSelected] = useState(null);

  return (
    <View className="bg-white flex-grow">
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() => navigator.goBack()} className="p-3 ">
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text className="text-center text-xl py-4 ml-20">Select a Ride</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            className={`flex-row items-center justify-between px-10 ${
              item.id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              source={{ uri: item.image }}
              style={{ height: 80, width: 100, resizeMode: "cover" }}
            />
            <View className="-ml-6">
              <Text className="font-semibold text-xl">{item.title}</Text>
              <Text>
                {Math.round(travelTime)} min / {Math.round(travelDistance)} km
              </Text>
            </View>
            <Text className="text-xl">
              {Math.round(
                (travelDistance * item.costPerMile +
                  travelTime * item.costPerMin) *
                  item.multiplier
              )}
              $
            </Text>
          </TouchableOpacity>
        )}
      />
      <View className="mt-auto border-t border-gray-200">
        <TouchableOpacity
          disabled={!selected}
          className={`bg-black py-2 m-3 ${!selected && "bg-gray-300"}`}
        >
          <Text className="text-center text-white text-xl">
            Chose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default RideOptionsCard;
