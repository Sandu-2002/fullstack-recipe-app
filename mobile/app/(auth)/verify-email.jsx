import { View, Text, Alert, KeyboardAvoidingView, ScrollView, Image, Platform, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useSignUp } from "@clerk/expo";
import { authStyles } from '../../assets/styles/auth.styles'
import { COLORS } from '../../constants/colors'

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
        {/*title*/}
        <Text style={authStyles.title}>Verify Your Email</Text>
        <Text style={authStyles.subtitle}>We emailed you the six digit code to {email}</Text>

        <View style={authStyles.formContainer}>
          {/*code input*/}
          <View style={authStyles.inputContainer}>
            <TextInput
            style={authStyles.textInput}
            placeholder="Enter 6-digit code"
            placeholderTextColor={COLORS.textLight}
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            autoCapitalize="none"
            />
          </View>
          {/*verify button*/}
          <TouchableOpacity
          style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
          onPress={handleVerificaction}
          disabled={loading}
          activeOpacity={0.8}
          >
            <Text style={authStyles.buttonText}>{loading ? "Verifying... ": "Verify Email"} </Text>
          </TouchableOpacity>
          
          {/*back to Sign up*/}
          <TouchableOpacity style={authStyles.authButton.linkContainer} onpress={onBack}>
            <Text style={authStyles.linkText}>
                <Text style={authStyles.link}>Back to Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
      <Text>VerifyEmail</Text>
    </View>
  )
}

export default VerifyEmail