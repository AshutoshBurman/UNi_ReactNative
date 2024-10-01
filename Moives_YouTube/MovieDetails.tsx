import {
  Image,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Linking,
  Alert,
  Button
} from 'react-native';
import React, {useEffect, useState} from 'react'
import {Banner} from './MovieScreen';
import YoutubePlayer from 'react-native-youtube-iframe';
import axios from 'axios';
import YouTubeScreen from './YouTubeScreen';




const MovieDetails = (props) => {
  const {route} = props;
  const {movie} = route.params;
  let IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
  let imageurl = IMAGEPATH + movie.poster_path;

  return (
    <View>
      <StatusBar backgroundColor={'#373A40'} />
      <Banner />
      <View style={styles.container}>
        <Image source={{uri: imageurl}} style={styles.image} />
      </View>
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.text}>{movie.release_date}</Text>
      <Text style={styles.text}>{movie.overview}</Text>
      <View>
        <Button
          title="Play Trailer"
          onPress={() =>
            props.navigation.navigate('YouTubeScreen', {movie: movie})
          }
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop:10,
    height: 400,
    width: 300,
  },
  title: {
    fontWeight: '800',
    fontSize: 20,
    color: '#000000',
    padding:10
  },
  text: {
    fontWeight: '400',
    fontSize: 12,
    flexWrap: 'wrap',
    color: '#000000',
    paddingTop:0,
    padding: 10 ,
  }
});

export default MovieDetails;