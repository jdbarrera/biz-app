import React, { useState } from "react";
import { View, Button, StyleSheet, TextInput, Text, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground } from "react-native";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import Constants from 'expo-constants';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import { addMailContactAPI } from '../api/MailchimpAPI';
import * as Linking from 'expo-linking';


const address = '2450 Scott Blvd Suite 312\nSanta Clara, CA, 95050\nInfo@theinkapp.com\n408-417-1836';
const backgroundImage = require('../assets/Biz_LoadScreenBG.png');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center',
  },
  signUp: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  contactInfo: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
  },
  input: {
    color: '#ffffff',
    borderColor: '#ffffff',
    borderBottomWidth: 2,
    margin: 20,
    width: 150,
  },
  bodyText: {
    fontFamily: 'Roboto_400Regular',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff'
  },
  errorText: {
    fontFamily: 'Roboto_400Regular',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#ff0000'
  },
  buttonText: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    color: '#e2f1e5',
    textAlign: 'center',
  },
  submitBtn: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "transparent",
    paddingTop: 10, paddingBottom: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ffffff',
    width: 200,
    height: 50,
  },
  backBtnWrap: {
    position: 'absolute',
    top: Constants.statusBarHeight * 1.5,
    left: 10,
    zIndex: 2
  },
  backBtn: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "transparent",
    paddingTop: 10, paddingBottom: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ffffff',
    width: 100,
    height: 50,
  },
  bizBtn: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "transparent",
    paddingTop: 10, paddingBottom: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ffffff',
    width: 200,
    height: 50,
    marginTop: 20,
  },
  h2: {
    fontFamily: 'Montserrat_400Regular',
    color: '#ffffff',
    fontSize: 20,
  },
});

const SignUpForm = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formSuccessMsg, setFormSuccessMsg] = useState('');
  const [formErrorMsg, setFormErrorMsg] = useState('');

  const handleNameUpdate = name => {
    setName(name);
    
  };

  const handleEmailUpdate = email => {
    setEmail(email);
  };

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateForm = () => {
    if ( validateEmail(email) ) {
      return true;
    } else {
      setFormErrorMsg('Invalid Form Entry');
      return false;     
    }
  };

  const submit = async () => {
    if (validateForm) {
      let data = {
        email_address: email,
        status: 'subscribed',        
      };
      setIsLoading(true);
      let response = await addMailContactAPI(data);
      response.status == 200 ? updateFormResponse('success') : updateFormResponse('error');
    }    
  };

  const updateFormResponse = (response) => {
    switch (response) {
      case 'success':
        setIsLoading(false);
        setFormSuccessMsg('Thanks for signing up! Visit bizincubate.com for more info!');
      case 'error':
        setIsLoading(false);
        setFormErrorMsg('Something went wrong.  Check your email and try again.');
    }
  };

  const handleInstaLink = () => {
    Linking.openURL('https://www.bizincubate.com');
  };
    
  return ( 
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.backBtnWrap}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
      {isLoading 
        ?
          <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <ActivityIndicator size="large" color="#00ff00" />
          </ImageBackground>
        :
          
          <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.contactInfo}>
              <Text style={styles.h2}>Contact Info</Text>     
              <Text style={styles.bodyText}>{address}</Text>
            </View>
            {formSuccessMsg == ''
              ?
                <View style={styles.signUp}>
                  <Text style={styles.h2}>Sign Up For Our Mailing List</Text>
                  {formErrorMsg !== '' && <Text style={styles.errorText}>{formErrorMsg}</Text>}
                  <TextInput
                    placeholder="email"
                    placeholderTextColor='#ffffff'
                    value={email}
                    onChangeText={handleEmailUpdate}
                    autoCapitalize="none"
                    style={styles.input}
                  />
                  <TouchableOpacity style={styles.submitBtn} onPress={submit} >
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              :
                <View style={styles.signUp}>
                  <Text style={styles.bodyText}>{formSuccessMsg}</Text>
                  <TouchableOpacity style={styles.bizBtn} onPress={handleInstaLink} >
                    <Text style={styles.buttonText}>Visit BizIncubate.com</Text>
                  </TouchableOpacity>
                </View>
              }
          </ImageBackground>  
      }
    </KeyboardAvoidingView>      
  );
}

export default SignUpForm;