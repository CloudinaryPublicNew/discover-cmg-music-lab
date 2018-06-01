# Social Sharing

We would like to allow user's share the track they are currently listening to. For this, we'll make use of the [vue-social-sharing](https://github.com/nicolasbeauvais/vue-social-sharing) library. This library makes creating social sharing links a breeze. We'll feed information about the current playing track into the component and it will generate proper sharing link.

First we'll register the social sharing library as an external plugin for our application. Create a file called `vue-social-sharing.js` in the `plugins` folder. Open the file and place the contents below in the file:

```javascript
// vue-social-sharing.js

import Vue from 'vue';

import SocialSharing from 'vue-social-sharing';

Vue.use(SocialSharing);
```

After registering the plugin, open the `Player.vue` file and update it to include social sharing links for the player. Replace the `<!-- social sharing here -->` comment with the social sharing component

```vue
// Player.vue

<template>
  <v-container>
    ...

    <v-flex xs2 v-if="!noTracks">
      <social-sharing 
        :title="this.share.title"
        :description="this.share.description"
        :quote="this.share.quote"
        :hashtags="this.share.hashtags"
        :twitter-user="this.share.twitteruser"
        :url="this.share.src"
        inline-template>
         <v-layout align-center justify-space-around>
          <network network="twitter">
            <v-icon>fa fa-twitter</v-icon>
          </network>
        </v-layout>
      </social-sharing>
      </v-flex>

      ...
  </v-container>
</template>

<script>
...
export default {
  data() {
    ...
  },
  ...
  methods: {
    fetchTracks: async function(albumId, track_ID) {
      const trackId = parseInt(track_ID, 10);
      this.loading = true;

      const response = await fetch(`${API_BASE_URI}/tracks/${albumId}`);
      const data = await response.json();
      // call the formatShareItem function to update the share information to suit the current track
      this.share = this.formatShareItem(this.currentTrack);

      ... 

    },
    
    ...

    isPlayed(e) {
      const track_ID = e.srcElement.currentSrc.split('/')[5];

      this.currentTrack = this.findTrackInList(track_ID);
      // call the formatShareItem function to update the share information to suit the current track
      this.share = this.formatShareItem(this.currentTrack);
      
      ...

    },
    formatShareItem(track) {
      let title = track.title.split('?')[0];
      let description = `${track.artist.name} - ${track.release.title}`;
      let quote = `${track.artist.name} - ${track.release.title}`;

      const share = {
        url: `${API_BASE_URI}/song/${track.id}/stream`,
        title: title,
        description: description,
        quote: quote,
        hashtags: `${this.createHashTag(
          track.artist.name
        )},${this.createHashTag(track.release.title)}`,
        twitteruser: 'cloudinary',
      };
      return share;
    },
  }
</script>
```

In the `methods` object, we added a new method call `formatShareItem`. This method takes a track's data as a parameter. The function then curates data to be used for the share component from the track. We call the `formatShareItem` in two other methods `isPlayed` and `fetchTracks`to update the share information when it is fetched and when a new track is being played.
