## Context

Trying to build a simple experience with Algolia components to have real time search.

In addition to regular Algolia libraries I used

- Next.js for bootstraping the project, having good defaults for perf, DX, SSR as well as deployability via Vercel.
- Chakra UI for some readily made components
- Cypress for some smoke testing in the main user search flows
- Prettier for formatting

### API

Uses Next.js serveless API routes to hide admin api keys and has routes for

- delete entry
- create entry
- upload bulk data to replace current content

### Pages and features

#### Home

Has a clean and simple search bar where user can **search** for both restaurants and food types having all the results in the same autocomplete dropdown.

- clicking on a restaurant should redirect for example to a product page (not implemented)
- clicking on a restaurant redirects the user to the search page with the correct filter

For the following section we SSR the results given user's location information to have an instant render of the results in the client side.

Has a section for recomended restaurant around user location (based on Vercel's geolocation feature to get location and Algolia geo search to match restaurants)

Has a section for recomended restaurant in user's country (based on Vercel's geolocation feature and filter on country). Would need a VPN to simulate country given all restaurants in the dataset are in the US

#### Search

Has a real time as type search result with refinement lists and numeric filters for score for each restaurant. Also has SSR in this page to ensure better performance and less CLS when user lands in the page.

Given the big amount of food types, users can also search in that category to refine results.

Also there's an effort made to clean the URL and have shorter and cleaner query params when sharing URL.

Here we also leverage composability of of the HitCard component, adding the "Delete" button, not present in the home page. Given the delay when deleting an object from the index, and in spite of the refresh in the query upon deletion success, there's a hack to visually remove the element from the search results (which should disappear in a few seconds).

#### Create

User has a form where they can create a new restaurant entry. Form is pretty long and could definitely be improved by using some autocomplete library for the place and have this API feed us all the lengthy information about the place... This uses fully uncontrolled form inputs HTML basic validation for required fields.

#### Upload

Instead of uploading data by hand or via a script, why not allowing to upload the JSON file via the UI. This will replace all content in current index.

### Shortcomings

- I invested more time in the search experience and results than on the visual side... Globally, Chakra (and its resets) don't play well with readily made styles for Algolia components. In a real world application, I believe I would use lower levels hooks and build a custom UI for the components. This would ensure a higher fidelity to potential brand aspects instead of having to work "around" Algolia styles

- Changing window size in search page while having filters active makes page loose filters because <Filters> component is unmounted from the DOM.

- Have not investigated how to have more robust tests by mocking Algolia client to make them more reproductible and prevent using Algolia quota for tests
