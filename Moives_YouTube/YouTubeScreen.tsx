import {View} from 'react-native'
import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';



const YouTubeScreen = (props) => {
  const {movie} = props.route.params;
  let Trailer = movie.videos[0].key;
  return(
    <View>
      <YoutubePlayer height={300} play={true} videoId={Trailer} />
    </View>
  );
};

export default YouTubeScreen;