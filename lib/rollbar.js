/* eslint-disable no-console */
import request from "superagent";
import invariant from "invariant";

function notifyRollbar({ ciCommiterName }) {
  invariant(
    process.env.ROLLBAR_ACCESS_TOKEN != null,
    "ROLLBAR_ACCESS_TOKEN environment is undefined, you need to set it"
  );

  invariant(
    process.env.CI_COMMIT_ID != null,
    "CI_COMMIT_ID environment is undefined, you need to set it"
  );

  invariant(
    process.env.NODE_ENV != null,
    "NODE_ENV environment is undefined, you need to set it"
  );

  const body = {
    access_token: process.env.ROLLBAR_ACCESS_TOKEN,
    environment: process.env.NODE_ENV,
    revision: process.env.CI_COMMIT_ID || "unknown",
    local_username: ciCommiterName,
  };
  request
    .post("https://api.rollbar.com/api/1/deploy/")
    .type("form")
    .send(body)
    .end((res) => {
      if (res && res.error) {
        console.log("There was an error while notifying rollbar.");
        console.error(res);
      }
    });
}

export default notifyRollbar;
