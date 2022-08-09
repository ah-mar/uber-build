import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { Icon } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png",
    screen: "Map",
  },
  {
    id: "456",
    title: "Order Food",
    image:
      "https://i.pinimg.com/originals/4f/eb/74/4feb745209cf7aba57463b20d27b61e3.png",
    screen: "Eats",
  },
];

const NavOptions = () => {
  const navigator = useNavigation();
  const origin = useSelector(selectOrigin);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      disabled={!origin}
      className="pr-2 pl-6 pb-8 pt-4 bg-gray-200 m-2  w-40 h-64"
      onPress={() => {
        navigator.navigate(item.screen);
      }}
    >
      <View className={!origin && "opacity-20"}>
        <Image
          source={{ uri: item.image }}
          style={{ width: 120, height: 120, resizeMode: "contain" }}
        />
        <Text className="mt-2 text-lg font-semibold">{item.title}</Text>
        <View className="p-2 bg-black rounded-full w-10 mt-4">
          <Icon name="arrowright" type="antdesign" color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
    />
  );
};
export default NavOptions;
