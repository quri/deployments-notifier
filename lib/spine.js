const request = require("request");
const invariant = require("invariant");

function notifySpine() {
  const {
    DEPLOYMENTS_USERNAME,
    DEPLOYMENTS_PASSWORD,
    DEPLOYMENTS_APP,
    CI_COMMIT_ID,
    NODE_ENV,
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
    NODE_ENV != null,
    "NODE_ENV must be a defined environment variable."
  );

  invariant(
    DEPLOYMENTS_APP != null,
    "DEPLOYMENTS_APP must be set to one of 'approvals', 'nervecenter'"
  );

  let SPINE_ENDPOINT;

  switch (NODE_ENV) {
    case "development": {
      SPINE_ENDPOINT = `http://localhost:4000/api/deployments/${DEPLOYMENTS_APP}`;
      break;
    }
    case "staging": {
      SPINE_ENDPOINT = `https://quri-spine-staging.herokuapp.com/api/deployments/${DEPLOYMENTS_APP}`;
      break;
    }
    case "ci":
    case "production": {
      SPINE_ENDPOINT = `https://quri-spine.herokuapp.com/api/deployments/${DEPLOYMENTS_APP}`;
      break;
    }
    default: {
      invariant(false, `Unknown value for NODE_ENV: ${process.env.NODE_ENV}`);
    }
  }

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
      console.log(`Deployment Notification with deplyment_id: ${DEPLOYMENT_ID} was sent to ${SPINE_ENDPOINT}`); // eslint-disable-line
    }
  });
}

export default notifySpine;
