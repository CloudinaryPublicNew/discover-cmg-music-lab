# Searching for Artists
Now that users can filter and paginate the list of artistes, we'll need a way to allow users search for their favorite artiste. You could say "Oh they can simply use the alphabet filter, if they know the name of the artiste"; well what if they don't? what if there were a hundred other artistes with the same name?

Adding the search functionality simply improves the user experience of the application. We've already added a search bar to the user interface, now let's make it actually search for artistes based on the user's entry.

Open the `Browse.vue` file and update it like so:

```vue
<template>
  ...
  <v-container fluid fill-height>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-text-field
          name="input-1-3"
          label="Search Artists"
          single-line
          prepend-icon="search"
          v-model="search"
          <!-- Include -->
          @input="debounceSearch"
        ></v-text-field> 
      </v-flex>
    </v-layout>
  </v-container>
  ...
</template>

<script>
  ...
  import debounce from 'lodash/debounce';
  
  ...
  methods: {
    ...

    debounceSearch: debounce(function(text) {
      if (!text) return;
      this.search = text;
      this.fetchSearchedItem.call(this, text);
    }, 1000),

    fetchSearchedItem: async function(searchTerm, page, pageSize) {
      if (!searchTerm) return;
      this.loading = true;
      const data = await fetchFilteredItems(
        'search',
        searchTerm,
        page,
        pageSize
      );
      console.log(data);
      this.type = 'search';
      this.items = data.searchResults.searchResult;
      this.totalItems = data.searchResults.totalItems;
      this.page = page;
      this.loading = false;
    },
  }
</script>
...

```

In the snippet above, we setup an event handler for the `input` change event. Using the `debounce` helper from `lodash`, we've been able to limit the number of function calls to once every second. Thus reducing the amount of calls to the server.

We created another method `fetchSearchedItem` to handle the search. This method uses the `fetchFilteredItems` function to return items based on the user's entry.

Try typing in the search bar, you'll notice that the list of artistes returned are similar to the search text entered.


