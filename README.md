CheckWallyHome
==============

Google Apps Script to Check on Wally Home Sensors via API

Installation

To use this script:
1. Log on to your Google account
2. Go to http://script.google.com
3. File > New > Project > Blank Project
4. Replace the text you find there with the CheckOnWallyHome.gs file found here
5. Change the Project Name at the top of the page to CheckOnWallyHome
6. Change Code.gs to CheckOnWallyHome
7. Run > CheckOnWallyHome
8. When the Authorization Required dialog box comes up, press Continue
9. When the next dialog box comes up, press Accept.  You are allowing the app to retrieve information from the Wally Home API service and send emails to you.
10. Log on to http://my.wallyhome.com
11. Go to Settings
12. Press Generate Token
13. Copy the token to the clipboard
14. Go back to the script editor
15. Replace xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx with the token pasted from the clipboard
16. replace x.gmail.com with your email address
17. File > Save
18. Resources > Current Project's Triggers
19. Click on No triggers set up. Click here to add one now.
20. Run should contain CheckOnWallyHome
21. Events should be Time-driven, hour driven, and every hour.  You may want to change Every hour to a longer interval using the drop down.
22. Save
23. File > Save

The script will now run at whatever interval you selected and report on all places and all sensors at all places that are registered in your My Wally Home account. 
