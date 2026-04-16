import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-900">
      <Text className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
        Pharmacy Delivery App
      </Text>
      <Text className="text-lg text-slate-600 dark:text-slate-300">
        NativeWind is perfectly set up!
      </Text>
    </View>
  );
}
