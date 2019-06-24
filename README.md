This file is a work-in-progress:

**************************************************
 DEMO
**************************************************

A hosted demo is coming soon. In the meantime, please watch 'APP-DEMO.mp4', which is located in the root directory, to get a sense of how the app works.

**************************************************
 INSTALLATION - PostgreSQL
**************************************************

  This app uses PostgreSQL as the database management system.
  Please install Postgres 6.9.0 or compatible version.

**************************************************
 INSTALLATION - TimeLocker
**************************************************

  Open bash or other Linux terminal and enter the following commands:
    git clone https://github.com/jehillert/TimeLockr
    cd TimneLockr


  Load schema file using commnad lne
    sudo -u postgres psql<schema_psql.sql

  To install TimeLocker, open a terminal in the root folder of this project and type:
    npm install

  To Run Create Database:
    Install the latest version of Postgres.
  To npm strart

**************************************************
ABOUT
**************************************************

Thanks for your interest in TimeLockr. The objective of this app is to enable users to make chunks of information completely inaccessible to themselves for a certain period of time.   Once submitted, user entries are stored on a remote server until the release date.  When a user opens the app, the client sends credentials to the server, the server authenticates the users credentials, and server time is used to check each entry to determine whether the release date as been reached.  each entrhy Server-side time is then used to , and server time is used to determine

Users can gain create an account that lets them use the app by providing a unique username and a password.  These credentials are stored in encrypted format in a Postgres database, which are stored on a server in encrypted form;
- When a user logs in with the correct credentials, the server retrieves the user's data and populates two pages of cards. On the first page, each card presents the data of a released entry. On the second page, each card presents a countdown timer and progress bar for a time entry that is still locked. Should a release date lapse while a user is engaged with the app, the associated card will be deleted from the second page while a card with the released information appears on thne first page.

contains  a page of Release Cards, each card presenting the information of an entry that has been time-released.  released information for different entries, and a page with cards that display the release date and a displays timers and a progress data the user is A user can Log in, which causes the main window to populate
- Users can extend the release dates of individual entries;
- Delete both locked and released entries on an individual basis;

Rather than go over all the reasons somebody might want to do that,

That said, Timelockr was not written with the expectation of attracting users. Partly, it was written to illustrate how software might be used to craft tools that fortify impulse control and executive function in users whose lives are negatively impacted by a lack thereof. Such tools might be of particular benefit, for example, to those afflicted with cognitive impairments, mood disorders, and other mental health conditions that interfere with individual will-power and self-control. These tools might also have potential for mainstream adoption, with popolur appeal increasing over time as technological innovation continues to make those things we want and desire instantly accessible.

,  whose lives suffer from a lack thereof, perhaps as a result of a cognitive impairment, .  Such tools could,for  help those who have

  I am currently transitioning from a career in patent law to a career in tech (hopefully).  To this end, the last nine months have been devoted to the study of javascript, web development, and software design.  I decided to make Timelockr my first big coding project because the subject matter makes it a good learning tool for developing full stack development skills.  In addition, the final product
