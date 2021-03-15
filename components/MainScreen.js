import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, ActivityIndicator, ImageBackground } from 'react-native';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';

const { width } = Dimensions.get("window");
const bodyText1 = 'To capture the attention of Modern Generations, Biz Incubate self funded the Biz Incubate App, a mobile business incubator, and technological innovation to connect entrepreneurs, and businesses to their workforce. The Biz Incubate App is live in the Google Play, and Apple Store. The Biz Incubate App is under beta test to connect our corporate structure to each Pod member. Biz Incubate seeks capital to bring phase 2, Pods , to the public, and continue phase 1 marketing.';
const bodyText2 = 'Biz Incubate has developed a proprietary operations strategy named Pods. Pods is a network based operations solution that creates a feeling of validation, and fulfillment with its participants. Biz Incubate utilizes Pods to conduct daily operations, track progress, and streamline project management. Biz Incubate is incorporating a software version of Pods into Stage 2 of the Biz Incubate App.';
const callToAction = 'Find out about the beta launch, release dates, and more by signing up!';

const backgroundImage = require('../assets/Biz_LoadScreenBG.png');

const MainScreen = ( { navigation } ) => {
  const handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync('https://google.com/');
  };

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Roboto_400Regular,
  });
    return (
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>        
          {fontsLoaded
            ?
              <ScrollView style={styles.scrollView} >
                <View style={styles.topLogoWrap}>
                  <Image
                    style={styles.topLogo}
                    source={require('../assets/Biz_LoadScreenLogo.png')}
                  />
                </View>
                <Text style={styles.bodyText}>{bodyText1}</Text>
                <View style={styles.photoTile}>
                  <Image
                    style={styles.centerPic}
                    source={require('../assets/BizIncon1.png')}
                  />
                </View>
                <Text style={styles.bodyText}>{bodyText2}</Text>
                <Text style={styles.bodyText}>{callToAction}</Text>
                <View style={styles.buttonWrap}>
                  <TouchableOpacity style={styles.signUpBtn} onPress={() => navigation.navigate('SignUpForm')} >
                    <Text style={styles.buttonText}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>    
            :
              <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#00ff00" />
              </View>
          }
        </ImageBackground>              
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center',
  },
  scrollView: {
  },
  photoTile: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  topLogoWrap: {
    alignItems: 'center',
  },
  topLogo: {
    height: 200,
    width: (width - 20),
    resizeMode: 'contain'
  },
  centerPic: {
    height: 250,
    width: (width - 20),
    resizeMode: 'contain',
  },
  bodyText: {
    fontFamily: 'Roboto_400Regular',
    margin: 24,
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff'
  },
  buttonText: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    color: '#e2f1e5',
    textAlign: 'center',
  },
  signUpBtn: {
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
  buttonWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  }
});

export default MainScreen;