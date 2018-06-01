# Configuring Route and Styling for Player Page

After creating an album page, the next step should be creating a page where the songs on the album could be played. Or what do you think?

We'll go ahead and create a new component called `Player` and this component will handle the listing of tracks on an album and it'll also hold the player. This player will be a component that will control the music the user will be listening to. Play, stop, shuffle etc.

Create a file called `Player.vue` in the components folder. The contents of the file should be updated using the steps below:

The component template should look like this:

### **Template**

```html
<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
    <v-breadcrumbs large>
      <v-icon slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item
        v-for="item in breadcrumbs"
        :href="item.link"
        :key="item.text"
        :disabled="item.disabled">
        {{ item.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3>
        <div class="album-artist" v-if="!noTracks">
          <img :src="transformAlbumAvatarImage" :alt="album.title">
          <h3>{{album.title}}</h3>
          <rise-loader :loading="loading" color="#fff"></rise-loader>
        </div>
      </v-flex>
      <v-flex xs1/>
      <v-flex xs6>
        <h3 v-if="noTracks">Wow! Something happened, we could not fetch the songs.</h3>

        <!-- Player here -->

        <rise-loader :loading="loading" color="#fff" v-if="!noTracks"></rise-loader>
      </v-flex>
      <v-flex xs1/>
      <v-flex xs2 v-if="!noTracks">

        <!-- social sharing here -->

      </v-flex>
    </v-layout>
  </v-container>
</template>
```

We have the breadcrumbs component present here. There's a banner showing the album art.

### **Script**

```javascript
import RiseLoader from 'vue-spinner/src/RiseLoader';
import { API_BASE_URI, cl, goTo, formatSlug, normalizeTitle } from '../utils';

export default {
  data() {
    return {
      share: {},
      album: {},
      tracks: [],
      artist: {},
      originalTracks: [],
      playlist: [],
      autoPlay: false,
      cl,
      noTracks: false,
      loading: false,
      currentTrack: {},
      initial: {
        src: '/',
        artist: '',
        title: '',
        pic: '',
        theme: 'pic',
      },
    };
  },
  created() {},
  computed: {
    breadcrumbs() {
      let artistLink = `/artist/${this.artist.id}/${this.artist.name}`;
      return [
        {
          text: 'Search',
          link: '/browse/a',
          disabled: false,
        },
        {
          text: this.artist.name,
          link: artistLink,
          disabled: false,
        },
        {
          text: this.album.title,
          link: this.$route.path,
          disabled: false,
        },
        {
          text: this.currentTrack.title,
          link: this.$route.path,
          disabled: true,
        },
      ];
    },
    transformAlbumAvatarImage() {
      return this.cl.url(this.album.image, {
        width: 200,
        height: 200,
        gravity: 'auto',
        crop: 'fill',
        fetchFormat: 'auto',
        quality: 'auto',
        type: 'fetch',
      });
    },
    transformArtistBannerImage() {
      return this.cl.url(this.artist.image, {
        width: 1800,
        height: 150,
        gravity: 'west',
        crop: 'lpad',
        aspectRatio: '16:9',
        background: 'auto:predominant',
        fetchFormat: 'auto',
        quality: 'auto',
        type: 'fetch',
      });
    },
  },
  methods: {
    pickTrack(id) {
      return this.originalTracks.find((track) => track.id === id.toString());
    },
  },
  components: {
    RiseLoader,
  },
};
```

We used cloudinary to transform the banner images in the `transformAlbumAvatarImage` and `transformArtistBannerImage` methods. In the computed `breadcrumbs` function, We set up the data for the breadcrumbs.

### Fetch tracks

Let's update the player component to fetch the list of tracks from the server. We'll then transform and display the returned.

```javascript
export default {
  data(){
    ...
  },
  created: {
    this.fetchTracks(this.$route.params.albumId, this.$route.params.trackId);
  },
  methods: {
    ...

    fetchTracks: async function(albumId, track_ID) {
      const trackId = parseInt(track_ID, 10);
      const response = await fetch(`${API_BASE_URI}/tracks/${albumId}`);
      const data = await response.json();

      this.loading = false;
      this.loading = true;
      this.originalTracks = data.tracks.track;
      this.currentTrack = this.findTrackInList(track_ID);
      this.initial = this.formatPlayListItem(this.currentTrack);
      this.tracks = this.createPlayList(this.originalTracks);
      this.playlist = this.createPlayList(this.originalTracks);
      this.album = this.tracks[0].albumInfo;
      this.artist = this.tracks[0].artistInfo;

      let title =
        this.artist.name +
        '>' +
        this.album.title +
        '>' +
        this.currentTrack.title;

      goTo(
        this.$router,
        `/player/${this.artist.id}/${this.album.id}/${
          this.currentTrack.id
        }/${normalizeTitle(title)}`,
        this.currentTrack
      );

      this.autoPlay = true;
      this.loading = false;

      if (this.tracks.length < 1) {
        this.noTracks = true;
        return;
      }
    },
    createPlayList(tracks) {
      return tracks.map((track) => this.formatPlayListItem(track));
    },
    createHashTag(text) {
      return text.replace(/\./g, '').replace(/ /g, '');
    },
    formatPlayListItem(track) {
      const newTrack = {
        src: `${API_BASE_URI}/song/${track.id}/stream`,
        artist: track.artist.name,
        title: track.title,
        pic: track.release.image.replace('http', 'https'),
        theme: 'pic',
        id: track.id,
        artistInfo: track.artist,
        albumInfo: track.release || {},
      };
      return newTrack;
    },
    findTrackInList(id) {
      if (id === 0 || id === '0') {
        return this.originalTracks[0];
      }
      return this.originalTracks.find((track) => track.id === id.toString());
    },
  }
}
```

There's kind of a lot going on here, so let's walk through it:

* `fetchTracks`: In this function, we fetch the list of tracks on an album using the native fetch API. We then find the `currentTrack` and format it(`initial`). Using the track list returned from(`originalTracks`), we'll create a playlist. Finally using the data returned from the request we'll craft a the url and navigate to it to enable deep linking.

* `createPlayList`: This function takes in an array of tracks and returns a formatted version of each track.

* `formatPlayListItem`: this function takes a track as a parameter. An object containing the specific info for the track is returned.

* `findTrackInList`: this returns a track based on the id sent in as a parameter.

### Style

```css
.aplayer-title {
  color: #303030 !important;
}
.aplayer-list ol li:hover {
  color: #303030 !important;
}
.aplayer-list-light {
  color: #303030 !important;
}
.share--twitter {
  display: block;
  width: 50px;
  height: auto;
}
```
