# Propeller Front End Coding Challenge

## Background

Commonly large datasets like maps (2D or 3D) are broken down into chunks with varying levels of detail. You will already be familiar with this concept in e.g. Google Maps, where you can zoom out to see the whole world in low detail. Zoom in and you can see your house. [This blog post](https://macwright.org/2012/05/15/how-web-maps-work.html) provides a good overview.

## The Challenge

We've tiled a high res image into a set of tiles in the 'tiled' folder found in `public/tile-assets` (un-tiled.jpg is just for reference). The task is to create a front-end application that displays the tiles in the style of a 2D map view. We have bootstrapped the application for you (with create-react-app) which provides some basic functionallity such as zooming on scroll and basic panning.

Please avoid using existing mapping frameworks such as Leaflet, Mapbox etc. The app should be self contained and simple for us to build and run (e.g. provide npm install/build/start).

## Tasks

- Fix the bug preventing panning from being in a natural direction
- Allow zooming using +/- buttons.
- Implement zooming that holds the center of the viewport the same. The point on the image at the center of the viewport should be maintained when zooming in and out, just like the functionallity in Google Maps.
- Implement smooth scrolling so instead of snapping between zoom levels provide a gradual transition

## Considerations

- Consider how your app is built.
- Consider coding style (e.g. robustness and maintainability).
- Block in some simple tests.
- Any other extensions you think would demonstrate your ninja coding skills and how you will be an awesome addition to the Propeller team.

That is a long list of things, and we are aware of the fact that your time is limited. Therefore, please let us know some of the tradeoffs that you have made, what you have focussed on and what you have ignored for now.
