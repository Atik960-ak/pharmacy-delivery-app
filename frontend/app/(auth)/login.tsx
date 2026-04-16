import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/src/store/useAuthStore';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleSendOtp = async () => {
    if (phone.length < 10) return;
    setIsLoading(true);
    const success = await login(phone);
    setIsLoading(false);
    
    if (success) {
      router.push({ pathname: '/(auth)/verify', params: { phone } });
    }
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
                Pharmacy Delivery
            </Text>
            <Text className="text-lg text-slate-500 dark:text-slate-400">
                Enter your mobile number to sign in or create an account
            </Text>
            </View>

            <View className="mb-8">
            <Text className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Mobile Number
            </Text>
            <View className="flex-row items-center border border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-900 px-4 h-16">
                <Text className="text-lg font-medium text-slate-800 dark:text-slate-200 mr-2 border-r border-slate-300 dark:border-slate-700 pr-3">
                +91
                </Text>
                <TextInput
                className="flex-1 text-lg text-slate-900 dark:text-white ml-1 font-medium"
                keyboardType="phone-pad"
                placeholder="00000 00000"
                placeholderTextColor="#94a3b8"
                value={phone}
                onChangeText={setPhone}
                autoFocus
                />
            </View>
            </View>

            <TouchableOpacity 
            className={`h-14 rounded-2xl items-center justify-center shadow-sm ${phone.length >= 10 ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-800'}`}
            onPress={handleSendOtp}
            disabled={phone.length < 10 || isLoading}
            >
            <Text className={`text-lg font-semibold ${phone.length >= 10 ? 'text-white' : 'text-slate-500 dark:text-slate-500'}`}>
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
