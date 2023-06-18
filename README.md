# Github Finder

See it live: [Calendar Planner](https://benevolent-empanada-0ff1cf.netlify.app/)

## Description
A small web-app that allows users to keep track of their monthly tasks/goals by entering them into a calendar. Users can also edit and delete these tasks as they please.  

## Background & Motivation
This app was intended to help the administrator of a music school business keep track of various tasks/due dates for the business without the use of spreadsheets. For this reason, it has a very practical, real-life application.

## Technologies
The current version of this project was done with:
* HTML
* Bootstrap and vanilla CSS
* React
* Firebase Firestore
* React-Day-Picker
* React-Toastify

## State of Completion
Completed and working. The one issue that I have not yet solved is the compatibility of react-day-picker with IOS. For some reason, the selected dates do now show as circled in IOS operating systems. This is something I will keep working to resolve.

## Learning Lessons & Challenges
### Using react-day-picker
This was my very first experience working with this date-picker component. I had to rely to the documentation to get the features that I required to work, such as limiting the calendar to just one year, showing only one month at a time, highlighting only specific dates, and displaying the selected date in the UI.

### Working with Firestore
Although I was not brand new to Firestore by this point, this project gave me an opportunity to continue to hone my skills. I got a nice refresher on how to get, edit, and delete document data, as well as to display it in a specific order using a Firestore query.

### Displaying Firestore data
I stored all task data in a Firestore collection called "tasks", where the id of each document represented a particular month. Each month contained an object that represented the day of a month, and each day in turn contained all (if any) tasks for that day. After fetching all the data for each day of the month, I had to figure out how to first check which of those days contained tasks and highlight only those days in the calendar. Then, depending on what day the user clicked, I had to display any tasks for that day in the UI. All this was a challenge which was fun to figure out. 

### Working with React Toastify
I had heard about react-toastify, but had never used it prior to this project, and was happy to get a chance to learn it. I love how easy it is to set up and how customizable it can be. Great library!

## Summary
I am pretty pleased with how this app turned out, although I think some of the logic could probably be made a bit more concise, which I will continue to try to implement with small improvements here and there. Also, as mentioned earlier, the calendar highlights do not seem to show on IOS devices for some reason. I tried looking for help on google to no avail, so this is something I need to still figure out. Other than this, this app is in perfect working order at the moment and is being used by the administrator at the music school business. Although here it appears as its own app, it actually forms just one of several features incorporated into an app that is used by the administrator.




