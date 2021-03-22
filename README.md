# TimeLockr-Client

## Live Demo

  A live demo of TimeLockr is hosted on Amazon AWS, and can be accessed [here](https://timelockr.hillert.dev). The backend of the application, TimeLockr-Server, and the [console popup](http://timelockr-server.herokuapp.com/) that appears when viewing the demo on a desktop, are hosted on Heroku.<sup>__1, 2__</sup>

## Local Installation

These instructions detail how to install, run and view TimeLockr-Client locally without installing the backend, TimeLockr-Server, which requires having Postgress installed and can be somewhat time-consuming to setup.  The environment variables in *.env.example* divert client API calls to a version of the back-end hosted on Heroku.

**Prerequisites, Recommended Editor & Recommended Extensions**

Although the app can be run without it, the method outlined herein requires your local machine to have Docker installed on your local machine.

It is recommended to use Microsoft VS Code to view and manage this application. It is further recommended to install the following VS Code extensions, as they may be useful if you have difficulty with installation.
- Docker (Microsoft)
- Remote - Containers (Microsoft)

**To install**, open a terminal and type:
  ```console
  foo@bar:~$ git clone https://github.com/jehillert/timelockr-client.git
  foo@bar:~$ cd timelockr-client
  foo@bar:~$ mv env.example .env
  foo@bar:~$ npm install
  ```

**To run**, open a terminal and type:
  ```console
  foo@bar:~$ cd path/to/timelockr-client
  foo@bar:~$ npm start
  ```

**To View**, open a web browser to [localhost:8080](http://localhost:8080/).


## About

TimeLockr allows users to "lock away" information from themselves for a specified period of time, the main objective being to relieve users of the burden of impulse control in circumstances where impulse control is difficult to maintain. <br>

### Functionality
The fictional use cases that follow are provided to illustrate the functionality of TimeLockr:<sup>__3__</sup>

* **Example 1:** A busy professional concerned with the impact that constant smartphone use has had on family life uses the app to "brick" his or her device on weekends. This is done by configuring the phone's child restriction settings so that all non-essential functions are locked out, entering the PIN number required to enable the restrictions into TimeLockr's entry form, and setting the entry form's timer to release the PIN by Monday morning.  To avoid circumventing the app by memorization, a new PIN is used every time the phone is bricked.<br>

* **Example 2:** After a recent breakup, a user avoids sending embarassing text messages and voicemails by storing the ex's unmemorized phone number in the app and setting a timer to release it after a month.<br>

* **Example 3:** In a permissive jurisdiction, a decedent delays eventual administration of portions of his or her estate by storing conveyances as entries in the app, and then referencing those conveyances in a will, along with the login credentials for accessing the decedent's TimeLockr account.<br>

* **Example 4:** A patient who lives alone recently underwent back surgery.  Concerned with the prospect of becoming addicted to the pain medication prescribed by her doctor, the patient uses the app to store the combo of a lock box between doses. The patient inputs the [unmemorized] combo into an entry form provided by the app and sets the timer so that the medication can be accessed only when the next dose is due. On days when pain is low, the patient uses another form in the app to extend the "release date" in order to avoid any tempation of taking a dose recreationally.<br>

### Codebase & Backend
TimeLockr-Client uses Material-UI components and is written primarily from Javascript (ES6) and ReactJS. Styled-components are used to override and provide custom styling for Material UI components and to provide styling for non-Mui components. Bundling is managed with Webpack 4. A demo of TimeLockr-Client is hosted on Amazon AWS and can be accessed here [here](https://timelockr.hillert.dev).

The backend for TimeLockr, TimeLockr-Server-Demo, is maintained as a [separate project](https://github.com/jehillert/timelockr-server-demo).  This project is based on NodeJS and built using create-react-app.  The project includes:
<ul>
    <li>An <b>Express Server</b> configured to store and retrieve user data from a PostgreSQL database;</li><p>
    <li>A separate React-based <b>"console" app</b>, uses web sockets to provide real-time logging showing actions taken by the server as a user interacts with the client demo.</li>
</ul>

### Endnotes
[1] The demo is currently configured to expose information passed into TimeLockr via a separate console (Timelockr-Server-Demo). Moreover, data stored in the application's database is not backed up and the database is likely to be erased from time to time. <b>As such, users are strongly encouraged not to enter sensitive or personal information into the demo.</b>
<br><br>
[2] TimeLockr's server is hosted on a free Heroku account, and sleeps when not in use. <b>If the demo does not immediately respond, please allow 10-15 seconds for the server to load.</b>
<br><br>
[3] <b>The foregoing examples are provided solely for illustrating function.</b> The developer does not suggest, endorse, or advocate using the app for any of the purposes described therein.
