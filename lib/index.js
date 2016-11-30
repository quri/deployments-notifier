import slack from "./slack";
import rollbar from "./rollbar";
import pusher from "./pusher";
import spine from "./spine";

const notifications = {
  slack,
  rollbar,
  pusher,
  spine,
};

const ciCommiterName = process.env.CI_COMMITTER_NAME || "somebody";

process.argv.slice(2)
  .map((notifierName) => (notifications[notifierName]))
  .forEach((notifier) => {
    notifier({ ciCommiterName });
  });

export default notifications;
