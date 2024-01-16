# Install
## Set auth:
npx playwright open --save-storage=".auth/user.json"

Then do the whole auth flow for slack:
https://YOUR-SLACK-TEAM.slack.com/

This will write the session state to .auth/user.json.

## Set .env
1. Rename .env-example to .env and add vars

You can find node path and npx path by doing `which node` and `which npx`
NODE_PATH=/path/to/node
NPX_PATH=/path/to/npx

NOTE: The slack URL must be in the form https://app.slack.com/client/SOMEIDSTUFF/MOREIDSTUFF
You can get the URL by logging in through the web browser

SLACK_TITLE=NAME_OF_YOUR_ORG

# To set status manually:
npx playwright test tests/set-status.spec.ts

# To run automatically
# Example script to run cron every day at 8:15AM

crontab -e
```sh
SHELL=/bin/bash
15 8 * * * cd ~/Projects/slack-status && ./run.sh >> ~/slack-status-output.log 2>&1
```

NOTE: cron only runs if computer is awake. You can schedule it to turn on using pmset: 
https://osxdaily.com/2022/11/10/how-to-schedule-boot-turn-on-shutdown-wake-sleep-on-macos-ventura/

`pmset repeat wakeorpoweron MTWRF 8:00:00`


# debug:
npx playwright test tests/set-status.spec.ts --headed


# Ideas
- Run this from linux instead, e.g., a VPC server 