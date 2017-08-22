![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# Bubbles Online Dive Logbook
#### Installation and setup

- Download or clone both the front end and api repositories

### Setting up front end locally
- `yarn` to install dependencies
- `gulp` to compile the source code and open in browser

> **Note**: You'll need to have `gulp-cli` installed globally
> `npm i -g gulp-cli`

### Setting up API locally
- Run `rails s` to run the rails app locally

### Relevant Links

- [GitHub APP link](https://github.com/Ollymid/Project-4-frontend)
- [GitHub API link](https://github.com/Ollymid/Project_4_api)

The Bubbles Logbook is available to view and register using this [Heroku Link](https://bubbles-log.herokuapp.com/)

## Project Description

The inspiration and overall aim for this project was to create an application to replace paper logbooks in the diving industry; an industry that is long overdue a tech overhaul
The purpose of this app is to allow users to log their dives digitally so they no longer have to worry about losing or damaging their paper book. Users can also add dive sites and share them so others can dive them too.

![Landing Page](http://i.imgur.com/m6prGO2.png)  

When the user first arrives at the page, they are greeted with the landing page. Divers absolutely love exclusivity, so users have to be logged in to view the dive site index page.

![Registraion](http://i.imgur.com/dzT3Nq2.png)

When a user registers, they select their diving level (e.g. most recent qualification)  so that other users (and diving instructors) can see what level of experience they are at. 

![Dive Logging](http://i.imgur.com/brtA3kL.png)

I purposefully made it so that dive logs can only be registered on dive sites that exist on the app. This is to stop users from haphazardly logging dives, and to allow others to see where they went and go there too.
All users are asked to report the same information you would be expected to input on a paper logbook.

![Dive Logging](http://i.imgur.com/15u1adk.png)

To view dive sites, the viewer can click on any one of the multitude of markers on the dive site index page that represent dive sites recorded by other users. 
Each Dive site will show the details of the site and also all the logs of people who have dived on that site

![Logging Site](http://i.imgur.com/rDHGT3I.png) 

The user uses the maps API and the form to create a new dive site for the bubbles community to view and potentially dive on. If the original poster feels that the marker is inaccurate they go back in and drag the marker to position to its new position

![Logbook](http://i.imgur.com/Yg4YACE.png)

Once you've logged a dive it will apear in user profile section which is essentially your logbook as it shows you all the dives you have done so far. Custom serialisers add up your dives and total dive time so you and other users (and instructors) can again see what level of experience you are at.

## Technologies Used
Below is a list of the technologies that were used to create this project. In addition to them, there were a number of dependancies that were used, which are availavle to view in the code.

- HTML5
- CSS3
- JavaScript ES6
- AngularJS
- Ruby
- Ruby on Rails
- PostgreSQL
- Satellizer
- Bulma UI
- SASS
- JSON
- JWT
- HTTParty
- AWS
- GULP
- Git
- GitHub
- Yarn


## Challenges

The biggest challenge of the application was managing the relationships between models to get the right information displaying in the Rails API payload. 

I had trouble with the users model - a User has many dive sites but the dive sites had many users.
This meant that when it came to editing rights of the dive sites, anybody could go and edit the sites. 

I fixed this by migrating in a creator attribute to the dive site model - this recorded the id of the user who create the dive site, which meant I could then add code that made the edit button only viewable by the creator.

Again,I found styling difficult, but I have gotten better at it since my last solo project so I am happy in that respect. 


## Making it better
There are a number of features I would like to add to the site, these include:

Improvements that I would like to make to the project in the future would be:

- Refinement to styling and layouts
- An in-app messaging communication system where divers can communicate with each other about things in relation to diving.
- Also a commenting and rating system would be great for dive sites to allow users to share their experiences and interact a bit more
- Adding more external API's to the app - like the Darksky's weather app and a dive site API to prepopulate the maps
- Directory of Divers filterable by certification and geographic location - so if you're a learner you can see if there are any instructor level members in your area and ask them if they can teach you, how much they charge etc 
- I have an ambitious Idea of writing out the Bühlmann decompression algorithm (variants used my most dive computers) in JavaScript so that when the user logs a dive, the app will notify them how much surface time they need to have before they can safely dive again within decompression limits.



