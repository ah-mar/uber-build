import { Icon } from "@rneui/themed";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Code Street, London, UK",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "London Eye, London, UK",
  },
];

const NavFavourites = () => {
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="bg-gray-200 h-[1px]" />}
        renderItem={({ item }) => (
          <TouchableOpacity className="flex-row items-center p-5">
            <View className="mr-4 rounded-full bg-gray-300 p-3 ">
              <Icon name={item.icon} type="ionicon" color="black" size={18} />
            </View>
            <View>
              <Text className="font-semibold text-lg">{item.location}</Text>
              <Text className="text-gray-500">{item.destination}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default NavFavourites;
