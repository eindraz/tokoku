import React, {useEffect} from "react";
import {StyleSheet, Image, ImageBackground} from 'react-native';

import bgSplash from '../assets/images/bgSplash.jpg';
import logoSplash from '../assets/images/logoSplash.png';

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Home');
        }, 5000)
    }, [navigation]);

        return (
            <ImageBackground style={styles.background}>
                <Image source={logoSplash} style={styles.logo} />
            </ImageBackground>
        )
 
}

export default SplashScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#DAF5FD'
    },
    logo: {
        width: 200,
        height: 256
    }
});