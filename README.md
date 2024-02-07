# Slack Status
Sets your slack status to a punny computer science joke every morning using playwright.

# Install
## Set auth:
`npx playwright open --save-storage=".auth/user.json"`

Then do the whole auth flow for slack, i.e., open a browser to
https://YOUR-SLACK-TEAM.slack.com/
Click on login, enter your credentials, etc. You should only have to do this once.

This will write the session state to .auth/user.json.

## Set .env
1. Rename .env-example to .env and add vars

You can find node path and npx path by doing `which node` and `which npx`
```
NODE_PATH=/path/to/node
NPX_PATH=/path/to/npx
SLACK_TITLE=NAME_OF_YOUR_ORG
SLACK_URL=https://app.slack.com/client/SOMEIDSTUFF/MOREIDSTUFF
```

NOTE: You can get the SLACK_URL by logging in to your slack channel through the web browser


# Run the script
`npx playwright test tests/set-status.spec.ts`

or
`chmod +x run.sh`

`./run.sh`

# Changing the statuses that are set
Based on the day of the month, it picks the line in `tests/input.csv` for which status to put. Eg., Feb 5 == Line 5 in the file. So, update `tests/input.csv` to change the statuses it will automatically set.

NOTE: there is a maximum status length on slack's end, the script will fail if you exceed that length. 

# Setting an emoji with the status
Currently not possible. This is turns out to be sort of hard. There's no way to "paste" in an emoji to the status setter, you have to select from the list, which means finding the emoji name, e.g., if you want 😀 to be the status, you need to have the slack identifier "grinning emoji" somewhere in `input.csv`.

# Debug:
You can step through the script run using --debug flag:

`npx playwright test --debug`

Watch the whole script run:

`npx playwright test tests/set-status.spec.ts --headed`

# Scheduling a status
In your terminal, run:

`crontab -e`

Set a cron to run at 8:15AM Everyday
```sh
SHELL=/bin/bash
15 8 * * * cd ~/Projects/slack-status && ./run.sh >> ~/slack-status-output.log 2>&1
```

NOTE: cron only runs if computer is awake. You can schedule it to turn on using pmset: 
https://osxdaily.com/2022/11/10/how-to-schedule-boot-turn-on-shutdown-wake-sleep-on-macos-ventura/

`pmset repeat wakeorpoweron MTWRF 8:00:00`

You can also consider running this from a virtual private server or GitHub action instead.

# Debug:
You can step through the script run using --debug flag. 
`npx playwright test --debug`

Watch the whole script run:
`npx playwright test tests/set-status.spec.ts --headed`
