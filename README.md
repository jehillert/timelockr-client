#TimeLockr-Client

This application allows users to "lock away" information from themselves for a specified period of time, the main objective being to relieve users of the burden of impulse control in circumstances where impulse control is difficult to maintain. A demo is available [here](https://timelockr.hillert.dev).<br>

###Functionality
The fictional use cases that follow are provided to illustrate the functionality of TimeLockr:<sup>__***i***__</sup>

* **Example 1:** A busy professional concerned with the impact that constant smartphone use has had on family life uses the app to "brick" his or her device on weekends. This is done by configuring the phone's child restriction settings so that all non-essential functions are locked out, entering the PIN number required to enable the restrictions into TimeLockr's entry form, and setting the entry form's timer to release the PIN by Monday morning.  To avoid circumventing the app by memorization, a new PIN is used every time the phone is bricked.<br>

* **Example 2:** After a recent breakup, a user avoids sending embarassing text messages and voicemails by storing the ex's unmemorized phone number in the app and setting a timer to release it after a month.<br>

* **Example 3:** In a permissive jurisdiction, a decedent delays eventual administration of portions of his or her estate by storing conveyances as entries in the app, and then referencing those conveyances in a will, along with the login credentials for accessing the decedent's TimeLockr account.<br>

* **Example 4:** A patient who lives alone recently underwent back surgery.  Concerned with the prospect of becoming addicted to the pain medication prescribed by her doctor, the patient uses the app to store the combo of a lock box between doses. The patient inputs the [unmemorized] combo into an entry form provided by the app and sets the timer so that the medication can be accessed only when the next dose is due. On days when pain is low, the patient uses another form in the app to extend the "release date" in order to avoid any tempation of taking a dose recreationally.<br>

###Codebase & Backend<br>
The application is written in ReactJS and bundled using Webpack 4. A demo of TimeLockr-Client is hosted on Amazon AWS and can be accessed here [here](https://timelockr.hillert.dev). <sup>__***ii, iii***__</sup> 

The [backend](https://github.com/jehillert/timelockr-server-demo) for TimeLockr is maintained as a separate project.  This project is based on NodeJS and includes:
<ul>
    <li>An Express Server configured to store and retrieve user data from a PostgreSQL database;</li>
    <li>A separate React "console", which uses web sockets to output real-time logging of the server to a popup window as a user interacts with the TimeLockr-Client demo.</li>
</ul>

<span style="font-size:10pt;">*(i)* __The foregoing examples are provided solely for illustrating function__. </span> <span style="font-size:10pt;">The developer does not suggest, endorse, or advocate using the app for any of the purposes described therein.</span><br>
<span style="font-size:10pt;">*(ii)* The demo is currently configured to expose information passed into TimeLockr via a separate console (Timelockr-Server-Demo). Moreover, data stored in the application's database is not backed up and the database is likely to be erased from time to time. **As such, users are strongly encouraged not to enter sensitive or personal information into the demo.** </span> <br>
<span style="font-size:10pt;">*(iii)* TimeLockr's server is hosted on a free Heroku account, and sleeps when not in use. **If the demo does not immediately respond, please allow 10-15 seconds for the server to load.**</span>  
</span>
