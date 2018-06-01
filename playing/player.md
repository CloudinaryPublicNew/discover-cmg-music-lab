# Music Player

We've set up the player page but we're yet to play any music on the page. To set up a player on the page, we'll be making use of the [vue-aplayer](https://github.com/SevenOutman/vue-aplayer) library. The `vue-aplayer` library provides a player component. We'll load the album track list on the player component which comes with controls to play, shuffle, forward etc. the songs.

Let's update the `Player.vue` file to make use of the player component. Place the component where we had the `<!-- player here-->` comment.

```vue
// Player.vue
<template>
  <v-container>
    ...

    <v-flex xs6>
      <h3 v-if="noTracks">Wow! Something happened, we could not fetch the songs.</h3>
      <aplayer
        :autoplay="autoPlay"
        :music="initial"
        :list="tracks"
        float
        v-if="!loading"
        @playing="isPlayed($event)"
      />
      <rise-loader :loading="loading" color="#fff" v-if="!noTracks"></rise-loader>
    </v-flex>
    ...

  </v-container>
</template>

<script>
...
import Aplayer from 'vue-aplayer';

export default {
  ...

  methods: {
    ...

    isPlayed(e) {
      const track_ID = e.srcElement.currentSrc.split('/')[5];
      this.currentTrack = this.findTrackInList(track_ID);
      let title =
        this.artist.name +
        '_' +
        this.album.title +
        '_' +
        this.currentTrack.title;

      goTo(
        this.$router,
        `/player/${this.artist.id}/${this.album.id}/${
          this.currentTrack.id
        }/${normalizeTitle(title)}`,
        this.currentTrack
      );
    }
  },
  components: {
    Aplayer,
    RiseLoader,
  },
}
</script>
```

The new `isPlayed` method is an event handler for when a new track is played. In this method we get the info for the current playing track, curate a url using that data and navigate to the url. 

By now, we should be able to play tracks loaded onto the player component. Next step is to allow user's share the current track they're listening to.