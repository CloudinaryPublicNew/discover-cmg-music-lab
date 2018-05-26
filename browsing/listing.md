# Fetching and Listing a List of Artists

Here is what a code sample looks like:

```js
export const fetchFilteredItems = async function (
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
}
```