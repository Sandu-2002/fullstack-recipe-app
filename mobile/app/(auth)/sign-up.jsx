import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { useSignUp } from "@clerk/expo";
import { authStyles } from '../../assets/styles/auth.styles'
import { Image } from 'expo-image'
import { COLORS } from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons';

const SignUpScreen = () => {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState (false);
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  const handleSignUp = async () =>{
    if (!email || !password) return Alert.alert("Error", "Please fill all fields");
  if (password.length < 8) return Alert.alert("Error", "Password must be at least 8 characters long");
  if (!isLoaded) return;
  setLoading(true);

  try {
    await signUp.create({
      identifier: email,
      password})
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
  } catch (err) {
    Alert.alert("Error", err.errors?.[0]?.message || "Sign up failed. Please try again.");
    console.error(JSON.stringify(err, null, 2));
  }finally {    
    setLoading(false);
  }

  };

  if (pendingVerification) return <text>pending ui will go here</text>;

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView style={authStyles.keyboardView} behavior={Platform.OS === "android" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "android" ? 25 : 0}>
              <ScrollView
                contentContainerStyle={authStyles.scrollViewContent}
                showsVerticalScrollIndicator={false}
              >
                <View style={authStyles.imageContainer}>
                  <Image 
                    source={require("../../assets/images/i2.png")}
                    style={authStyles.image}
                    contentFit="contain"/>
                </View>
                <Text style={authStyles.title}>Create an Account</Text>

                {/* FORM CONTAINER*/}
                <View style={authStyles.formContainer}>
                  {/* email input*/}
                  <View style={authStyles.inputContainer}>
                    <TextInput
                      style={authStyles.textInput}
                      placeholderTextColor={COLORS.textLight}
                      value={email}
                      onChangeText={setEmail}
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>

                  {/* password input*/}
                  <View style={authStyles.inputContainer}>
                  <TextInput
                    style={authStyles.textInput}
                    placeholderTextColor={COLORS.textLight}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity style={authStyles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color={COLORS.textLight} />
                </TouchableOpacity>
                </View>
                  {/* sign up button*/}
                  <TouchableOpacity style={[authStyles.authButton, loading && authStyles.buttonDisabled]} 
                                onPress={handleSignUp} 
                                disabled={loading}
                                activeOpacity={0.8}
                                >
                                  <Text style={authStyles.buttonText}>{loading ? "Creating Account..." : "Sign Up"}</Text>
                                </TouchableOpacity>
                  {/* Sign in link */}
                  <TouchableOpacity style={authStyles.linkContainer} onPress={() => router.back()}
                                  >
                                  <Text style={authStyles.linkText}>Alreay have an account? <Text style={authStyles.link}>Sign In</Text></Text>
                  
                                </TouchableOpacity>
               </View>
              </ScrollView>
            </KeyboardAvoidingView>
    </View>
  )
}

export default SignUpScreen