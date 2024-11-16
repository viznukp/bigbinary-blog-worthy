import { getFromLocalStorage } from "utils/storage";

export const subscribeToPostDownloadChannel = ({
  consumer,
  setMessage,
  setProgress,
  generatePdf,
}) => {
  const userId = getFromLocalStorage("authUserId");
  const reportDownloadSubscription = consumer.subscriptions.create(
    {
      channel: "PostDownloadChannel",
      pubsub_token: userId,
    },
    {
      connected() {
        setMessage("Connected the Cables...");
        generatePdf();
      },
      received(data) {
        const { message, progress } = data;
        setMessage(message);
        setProgress(progress);
      },
    }
  );

  return reportDownloadSubscription;
};
