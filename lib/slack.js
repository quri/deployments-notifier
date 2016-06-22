/* eslint-disable no-console */
import invariant from "invariant";
import request from "superagent";

function notifySlack({ ciCommiterName }) {
  invariant(
    process.env.SLACK_CHANNEL != null,
    "SLACK_CHANNEL is undefined, you need to specify a Slack Channel to notify"
  );

  invariant(
    process.env.SLACK_WEBHOOK_URL != null,
    "SLACK_WEBHOOK_URL is undefined, you need to specify a Slack Channel to notify"
  );

  invariant(
    process.env.DEPLOY_BUCKET != null,
    "DEPLOY_BUCKET environment is undefined, you need to set it"
  );

  invariant(
    process.env.NODE_ENV != null,
    "NODE_ENV environment is undefined, you need to set it"
  );

  const body = {
    channel: `#${process.env.SLACK_CHANNEL}`,
    username: "DeployBot",
    text: `${ciCommiterName} just deployed to ${process.env.NODE_ENV}: ${process.env.DEPLOY_BUCKET}`,
  };
  request
    .post(process.env.SLACK_WEBHOOK_URL)
    .type("json")
    .send(body)
    .end((res) => {
      if (res && res.error) {
        console.error("There was an error while notifying slack.");
        console.error(res);
      }
    });
}

export default notifySlack;
