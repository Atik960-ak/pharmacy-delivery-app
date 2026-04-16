import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/src/store/useAuthStore';

export default function CompleteProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const updateProfile = useAuthStore((state) => state.updateProfile);

  const handleFinish = async () => {
    if (name.trim().length === 0) return;
    setIsLoading(true);
    await updateProfile(name, email);
    setIsLoading(false);
    
    // Once done, explicitly navigate to tabs
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        >
        <View className="flex-1 px-6 justify-center">
            <View className="mb-10">
            <Text className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                Almost Done!
            </Text>
            <Text className="text-lg text-slate-500 dark:text-slate-400">
                Please complete your profile to continue
            </Text>
            </View>

            <View className="mb-6">
                <Text className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Full Name *
                </Text>
                <TextInput
                    className="border border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-900 px-4 h-16 text-lg text-slate-900 dark:text-white font-medium"
                    placeholder="John Doe"
                    placeholderTextColor="#94a3b8"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    autoFocus
                />
            </View>

            <View className="mb-10">
                <Text className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email Address (Optional)
                </Text>
                <TextInput
                    className="border border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-900 px-4 h-16 text-lg text-slate-900 dark:text-white font-medium"
                    keyboardType="email-address"
                    placeholder="john@example.com"
                    placeholderTextColor="#94a3b8"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
            </View>

            <TouchableOpacity 
                className={`h-14 rounded-2xl items-center justify-center shadow-sm ${name.trim().length > 0 ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-800'}`}
                onPress={handleFinish}
                disabled={name.trim().length === 0 || isLoading}
            >
            <Text className={`text-lg font-semibold ${name.trim().length > 0 ? 'text-white' : 'text-slate-500 dark:text-slate-500'}`}>
                {isLoading ? 'Saving...' : 'Finish Setup'}
            </Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
