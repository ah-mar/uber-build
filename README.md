# App Description
This app is a basic Uber clone app built as a react native application using expo.

## Structure
The app initializes from `App.js`. The App has multiple providers, Stack Navigator and screens. The 2 major screens are HomeScreen and MapScreen. The third screen for EatsScreen is not functional yet.

### HomeScreen
The HomeScreen has 3 major components- the search bar(Ride Origin) from Google Places AutoComplete, NavOptions and NavFavourites.
NavOptions list 2 services - get a ride and order food. Only get a ride is functional.
NavFavourites has your favourite location saved. It is not functional yet.

### MapScreen
The MapScreen is divided in two halves.

The first half shows maps, markers and navigation. The map functionality is implemented in `Map.js` component. It uses Mapview and markers from React native maps and map view directions from react native maps directions. Travel distance and duration are also extracted from map directions.

The second half has a nested navigator with 2 subscreens - NavigateCard component and RideOptionsCard.
The NavigateCard screen renders NavigateCard component. It has a search bar component(Ride Destination), NavFavourites component which is reused here for saved travel location, and two buttons for Rides and Eats. Only Rides is functional. Selecting destination will navigate user to RideOptions Card Screen.
The Ride Options card show the 3 ride options with rates calculated from distance and time returned from directions.

## Providers
The apps use multiple providers- Redux providers for state, Navigation provider for navigation, Safe area Provider for implementing safe area in both iOS and android and Tailwind provide for use of tailwind classes in the app.

## State Management
This app use redux toolkit for state management. There are four pieces of state - origin, destination, travel distance and travel time. The Origin and Destination is set by data returned by Google Place autocomplete. The react native maps use these data to generate map marker and react native maps directions use these to generate directions and set Travel distance and travel time.

## CSS and Styling
This app use Tailwind utility classes for styling. The icons are used from React native elements.

## API
The app uses Google Places API and Directions API. The Distance Matrix API can be used if more advanced functionality is implemented in future.