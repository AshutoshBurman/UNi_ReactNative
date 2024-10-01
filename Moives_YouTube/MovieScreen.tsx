import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

const MovieListItem = (props) => {
  let IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
  let imageurl = IMAGEPATH + props.movie.poster_path;

  return (
    <View style={styles.movieItem}>
      <View style={styles.movieItemImage}>
        <Image source={{uri: imageurl}} style={{width: 99, height: 146}} />
      </View>
      <View style={{marginHorizontal: 5}}>
        <Text style={styles.movieItemTitle}>{props.movie.title}</Text>
        <Text style={styles.movieItemText}>{props.movie.release_date}</Text>
        <Text
          numberOfLines={6}
          ellipsizeMode="tail"
          style={styles.movieItemText}>
          {props.movie.overview}
        </Text>
      </View>
    </View>
  );
};

const MovieList = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=1fba3146ec5cccd3ea8c73fcf3a9a38c'
      )
      .then(res => {
        const movieResults = res.data.results;

        movieResults.forEach((movie, index) => {
          axios
            .get(
              `https://api.themoviedb.org/3/movie/${movie.id}?api_key=1fba3146ec5cccd3ea8c73fcf3a9a38c&append_to_response=videos`
            )
            .then(res => {
              movieResults[index].videos = res.data.videos.results;
              setMovies([...movieResults]);
            });
        });
      });
  }, []);
  if (movies.length === 0) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, padding: 20}}>
        <Text>Loading, Please wait...</Text>
      </View>
    );
  }



  let movieItems = movies.map(function (movie, index) {
    const itemPressed = (_index: number) => {
      props.navigation.navigate('MovieDetails', {movie: movies[index]});
    };
  
  return (
      <TouchableHighlight
        onPress={_ => itemPressed(index)}
        underlayColor="lightgrey"
        key={index}>
        <MovieListItem movie={movie} key={index} />
      </TouchableHighlight>
    );
    });
  return <ScrollView>{movieItems}</ScrollView>;
};



export const Banner = () => {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannertext}>Movies</Text>
    </View>
  );
};

const MovieScreen: () => Node = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#373A40'} />
      <Banner />
      <MovieList navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEEEEE',
    flex: 1,
  },

  banner: {
    backgroundColor: '#DC5F00',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannertext: {
    color: 'black',
    fontSize: 25,
    fontWeight: '600',
  },
  movieItem: {
    margin: 5,
    flex: 1,
    flexDirection: 'row',
  },
  movieItemImage: {
    marginRight: 5,
  },
  movieItemTitle: {
    fontWeight: '800',
    fontSize: 15,
    color: 'black',
  },
  movieItemText: {
    flexWrap: 'wrap',
    marginRight: 105,
    color: 'black',
  },
});

export default MovieScreen;
