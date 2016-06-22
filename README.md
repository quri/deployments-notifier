[![npm version](https://badge.fury.io/js/deployments-notifier.svg)](https://badge.fury.io/js/deployments-notifier)

# Deployments Notifier

This utility lets you notify various third party services when a deployment happens. It's configuration is defined with environment variables.

```
npm install deployments-notifier
```

Services supported: [Rollbar](http://rollbar.com) / [Slack](https://slack.com/) / [Pusher](http://pusher.com)

## Slack

Configuration :

| name                         | description                                                                                                         |
|------------------------------|---------------------------------------------------------------------------------------------------------------------|
| `SLACK_CHANNEL` (required)     | The Slack Channel where the notification should be posted (eg: `deployments`)                                       |
| `SLACK_WEBHOOK_URL` (required) | The Slack webhook url (eg: `https://yourorganisation.slack.com/services/hooks/incoming-webhook?token=XXXXXXXXXXX` ) |
| `DEPLOY_BUCKET` (required)     | The S3 bucket where the application was deployed (can be an arbitrary url)                                          |
| `NODE_ENV` (required)          | The environment you just deployed to (eg: `production`)                                                             |
| `CI_COMMITTER_NAME` (optional)  | The name of the person who deployed (defaults to `somebody`)                                                       |

Usage:
```shell
SLACK_WEBHOOK_URL=https://yourorg.slack.com/services/hooks/incoming-webhook?token=XXXX \
SLACK_CHANNEL=random \
DEPLOY_BUCKET=http://example.com \
CI_COMMITTER_NAME="John Doe" \
NODE_ENV=production \
deployments-notifier slack
```
Result:

<img width="464" alt="screenshot 2016-06-22 13 25 15" src="https://cloud.githubusercontent.com/assets/1869/16283837/5cc2d760-3883-11e6-92b7-1bacd1d04789.png">

## Rollbar

Configuration:

| name                            | description                                                                                                                  |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `ROLLBAR_ACCESS_TOKEN` (required) | The Rollbar post_server_item access token (can be found at https://rollbar.com/quri/[your project]/settings/access_tokens/ ) |
| `NODE_ENV` (required)             | The environment you just deployed to (eg: `production`)                                                                      |
| `CI_COMMIT_ID` (optional)         | The commit that was just deployed (eg: `903aabcac0ba49dc444c9b3d5baa0ecdfb77972f`, default: `unknown`)                       |
| `CI_COMMITTER_NAME` (optional)     | The name of the person who deployed (defaults to `somebody`)                                                                 |

Usage:
```shell
CI_COMMITTER_NAME="John Doe" \
NODE_ENV=production \
ROLLBAR_ACCESS_TOKEN=XXXXXX \
CI_COMMIT_ID=ebb506d09a5e859e63fbfe02bc0df9a3567df8ae \
deployments-notifier rollbar
```
Result:

<img width="574" alt="screenshot 2016-06-22 13 59 39" src="https://cloud.githubusercontent.com/assets/1869/16283836/5cc198c8-3883-11e6-8a45-e7a15f8246b3.png">

## Pusher

Configuration:

| name                         | description                                   |
|------------------------------|-----------------------------------------------|
| `PUSHER_APP_ID` (required)     | The Pusher application id                     |
| `PUSHER_KEY` (required)        | The Pusher Key                                |
| `PUSHER_SECRET` (required)     | The Pusher Secret Key                         |
| `PUSHER_CHANNEL` (required)    | The Pusher channel where to post the message  |
| `PUSHER_EVENT_NAME` (optional) | The Pusher event name (default: `deployment`) |


Usage:
```shell
PUSHER_APP_ID=XXXXX \
PUSHER_KEY=XXXXX \
PUSHER_SECRET=XXXXX \
PUSHER_CHANNEL=private-example-channel \
deployments-notifier.js pusher
```
Result:

<img width="875" alt="screenshot 2016-06-22 14 09 42" src="https://cloud.githubusercontent.com/assets/1869/16283835/5cab3254-3883-11e6-8d4c-854a55e2ce1b.png">


## Notes
`CI_COMMITTER_NAME` and `CI_COMMIT_ID` are defined by Codeship.
