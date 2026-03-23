import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import {useSignIn}  from "@clerk/expo"
import { useRouter } from "expo-router"
import { authStyles } from '../../assets/styles/auth.styles'
import { Image } from 'expo-image'

const SignInScreen = () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState (false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error","Please fill in all fields")
      return
    }
    if (!isLoaded) return;
    setLoading (true)

    try {
    const signInAttempt = await signIn.create ({
      identifier: email,
      password
    })
    if (signInAttempt.status === "complete"){
      await setActive({ session: signInAttempt.createdSessionId })
    }
    else {      
      Alert.alert("Error","Sign in failed. Please try again.");
      console.error(JSON.stringify(signInAttempt, null, 2));
    }
    }catch (err){
      Alert.alert("Erroe", err.errors?.[0]?.message || "Sign in failed. Please try again.");
      console.error (JSON.stringify(err, null, 2));

    } finally {
      setLoading(false);
    }
  }
  
  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView style={authStyles.keyboardView} behavior={Platform.OS === "android" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={authStyles.scrollViewContent} showsVerticalScrollIndicator={false}>
          
          <View style={authStyles.imageContainer}>
            <Image source={require("../../assets/images/i1.png")} 
            style={authStyles.image}
            contentfit = "contain" />
          </View>
          <Text style={authStyles.title}>Welcome Back!</Text>

          {/* FORM CONTAINER*/}
          <View>
            
          </View>


        </ScrollView>
        </KeyboardAvoidingView>
    </View>
  )
}

export default SignInScreen