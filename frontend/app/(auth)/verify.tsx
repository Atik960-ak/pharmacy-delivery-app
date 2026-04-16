import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuthStore } from '@/src/store/useAuthStore';

export default function VerifyScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const verifyOtp = useAuthStore((state) => state.verifyOtp);

  const handleVerify = async () => {
    if (otp.length < 6) return;
    setIsLoading(true);
    setError('');
    
    const success = await verifyOtp(phone || '', otp);
    setIsLoading(false);
    
    if (success) {
      router.replace('/(auth)/complete-profile');
    } else {
      setError('Invalid OTP code. For testing use 123456');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        >
        <View className="flex-1 px-6 justify-center">
            <TouchableOpacity onPress={() => router.back()} className="absolute top-[5%] left-6 z-10 py-2">
               <Text className="text-blue-600 dark:text-blue-400 text-lg font-medium">← Back</Text>
            </TouchableOpacity>

            <View className="mb-10 mt-10">
            <Text className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                Verify OTP
            </Text>
            <Text className="text-lg text-slate-500 dark:text-slate-400 leading-6">
                Enter the 6-digit code we just sent to{'\n'}
                <Text className="font-semibold text-slate-700 dark:text-slate-300">+91 {phone}</Text>
            </Text>
            </View>

            <View className="mb-8">
            <TextInput
                className={`border rounded-2xl bg-slate-50 dark:bg-slate-900 px-6 h-16 text-2xl tracking-[0.5em] text-center font-bold text-slate-900 dark:text-white ${error ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'}`}
                keyboardType="number-pad"
                maxLength={6}
                placeholder="000000"
                placeholderTextColor="#64748b"
                value={otp}
                onChangeText={(text) => {
                  setOtp(text);
                  if(error) setError('');
                }}
                autoFocus
            />
            {error ? <Text className="text-red-500 mt-3 font-medium text-center">{error}</Text> : null}
            </View>

            <TouchableOpacity 
            className={`h-14 rounded-2xl items-center justify-center shadow-sm ${otp.length === 6 ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-800'}`}
            onPress={handleVerify}
            disabled={otp.length !== 6 || isLoading}
            >
            <Text className={`text-lg font-semibold ${otp.length === 6 ? 'text-white' : 'text-slate-500 dark:text-slate-500'}`}>
                {isLoading ? 'Verifying...' : 'Verify & Continue'}
            </Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
