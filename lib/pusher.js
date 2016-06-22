import invariant from "invariant";
import Pusher from "pusher";

function notifyPusher() {
  invariant(
    process.env.PUSHER_APP_ID != null,
    "PUSHER_APP_ID environment is undefined, you need to set it"
  );

  invariant(
    process.env.PUSHER_KEY != null,
    "PUSHER_KEY environment is undefined, you need to set it"
  );

  invariant(
    process.env.PUSHER_SECRET != null,
    "PUSHER_SECRET environment is undefined, you need to set it"
  );

  invariant(
    process.env.PUSHER_CHANNEL != null,
    "PUSHER_CHANNEL environment is undefined, you need to set it"
  );

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    encrypted: true,
  });

  const eventName = process.env.PUSHER_EVENT_NAME || "deployment";

  pusher.trigger(process.env.PUSHER_CHANNEL, eventName, {
    type: "info",
    message: "A new version of this application has been deployed. Please <a onclick=\"location.reload()\">reload the page</a>",
  });
}

export default notifyPusher;
