import { View, Text, Alert, KeyboardAvoidingView, ScrollView, Image, Platform } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useSignUp } from "@clerk/expo";
import { authStyles } from '../../assets/styles/auth.styles'

const VerifyEmail = ({ email, onBack }) => {
  const {isLoaded, signUp, setActive} =useSignUp();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerificaction = async () => {
    if(!isLoaded) return;

    setLoading (true)
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({code});
      if (signUpAttempt.status === 'complete') {
       await setActive({session: signUpAttempt.createdSessionId});
      }else{
        Alert.alert("Error", "Verification failed. Please try again.");
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } 
    catch (err) {
      Alert.alert("Error", err.errors?.[0]?.message || "Verification failed");
      console.error(JSON.stringify(err, null, 2));
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "android" ? 25 : 0}>  
      
      <ScrollView
      content ContainerStyle={authStyles.scrollContent}
      showsVerticalScrollIndicator={false}>
        {/*image container*/}
        <View style={authStyles.imageContainer}>
          <Image 
          source={require("../../assets/images/i3.png")}
          style={authStyles.image}
          contentFit="contain"/>
        </View>

        </ScrollView>
      </KeyboardAvoidingView>
      <Text>VerifyEmail</Text>
    </View>
  )
}

export default VerifyEmail