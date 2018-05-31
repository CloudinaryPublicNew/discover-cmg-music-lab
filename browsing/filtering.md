# Paginating and Alphabetic fliters

We need to be able to paginate the data returned from the server as we can have everything displayed on one page. That will be a long scroll. Also, so far, we can only see listings for artistes that their first name starts with `a`. We need to figure our a way to filter through the rest of the alphabet.

Vuetify has a pagination component, so we'll be making use of that. Let's update the `Browse` component to include the pagination component and alphabetic filters

### Template

```html
<!-- Browse.vue -->
<template>
  ...
  <v-container>
    <v-layout>
      <v-flex xs6 offset-xs2>

        <!-- Include an event listener for the changePage event -->
        <browse-list  
          v-if="!loading"
          :items="items"
          :type="type" :
          pageSize="pageSize"
          :totalItems="totalItems"
          @changePage="changePage($event)">
        </browse-list>

        <!-- pagination component -->
        <div v-if="!loading" class="text-xs-center">
          <v-pagination :length="Math.ceil(totalItems / pageSize)" v-model="page" circle></v-pagination>
        </div>
        <rise-loader :loading="loading" color="#fff"></rise-loader>
      </v-flex>

      <!-- the alphabet filter -->
      <v-flex xs2>
        <div class="alphabets" v-for="i in Math.ceil(alphabets.length / 6)" :key="i">
          <v-container fluid fill-height>
            <v-layout @click="goTo($router, `/browse/${alphabet}`)" v-for="(alphabet) in alphabets.slice((i - 1) * 6, i * 6)" :key="alphabet" row shrink>
              <v-flex xs2>
                <h3>{{alphabet.toUpperCase()}}</h3>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
```

In the `browse-list` component, we added an event listener to listen for a page change. Also, beneath the `browse-list`, we included the alphabets filter. This will be a list of letters and on each letter, when a click event is triggered, the `goTo` method is called which navigates the user to the selected letter filter.

### Script

```javascript
<script>
...
import { API_BASE_URI, ALPHABETS, goTo, fetchFilteredItems } from '../utils';

export default {
  name: 'browser',
  data() {
    return {
      ...
      alphabets: ALPHABETS.split(''),
      goTo,
      fetchFilteredItems,
    };
  },
  watch: {
    ...
    page(newPage) {
      this.fetchBrowsedItems(this.$route.params.alphabet, newPage);
    },
  },
  created() {
    ...
  },
  methods: {
    ...
    changePage(newPage) {
      this.fetchFilteredItems(this.$route.params.alphabet, 'browse', newPage);
    },
  }
  ...
</script>
```

We imported the alphabets string from the `utils` file, the alphabets got split to an array and was returned as a data property.

We started watching the `page` property for changes, and then made a request to the API with the page number. Also, we added a new method `changePage`. This will act as the event handler for the `changePage` event. 

In the event handler we made reference to a function called `fetchFilteredItems`. This function was imported from the `utils` file. We'll go ahead and create this function because we hadn't done so previously. Open the `utils.js` file and update it with the snippet below:

```javascript
// utils.js

...

export const fetchFilteredItems = async function(
  filterType,
  filterTerm,
  page = 1,
  pageSize = 6
) {
  const response = await fetch(
    `${API_BASE_URI}/${filterType}/${encodeURI(
      filterTerm
    )}?page=${page}&pageSize=${pageSize}`
  );
  const data = await response.json();
  return data;
};
```

Now we should be able to filter artistes using the letters of the alphabet and limiting the data returned using pagination.
