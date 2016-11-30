const request = require("request");
const invariant = require("invariant");

function notifySpine() {
  const {
    DEPLOYMENTS_USERNAME,
    DEPLOYMENTS_PASSWORD,
    CI_COMMIT_ID,
    SPINE_ENDPOINT,
  } = process.env;

  invariant(
    DEPLOYMENTS_USERNAME != null,
    "DEPLOYMENTS_USERNAME must be a defined environment variable."
  );

  invariant(
    DEPLOYMENTS_PASSWORD != null,
    "DEPLOYMENTS_PASSWORD must be a defined environment variable."
  );

  invariant(
    SPINE_ENDPOINT != null,
    "SPINE_ENDPOINT must be a defined environment variable. SPINE_ENDPOINT is where the notification request is POSTed."
  );

  const DEPLOYMENT_ID = CI_COMMIT_ID != null ? CI_COMMIT_ID : "unknown_commit_id";

  request.post({
    url: SPINE_ENDPOINT,
    auth: {
      user: DEPLOYMENTS_USERNAME,
      pass: DEPLOYMENTS_PASSWORD,
    },
    body: { deployment_id: DEPLOYMENT_ID },
    json: true,
  }, (err) => {
    if (err) {
      console.log(err); // eslint-disable-line
    } else {
      console.log(`Deployment Notification with deplyment_id: "${DEPLOYMENT_ID}" was sent to ${SPINE_ENDPOINT}`); // eslint-disable-line
    }
  });
}

export default notifySpine;
