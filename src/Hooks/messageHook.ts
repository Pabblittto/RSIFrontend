import { message } from "antd";

/**
 * Hook for displaying loading indicator and error message
 */
export const useLoadingMessage = (displayText: string = "Fetching data...") => {
  const key = "messageKey";

  const startLoading = () => {
    message.loading({ content: displayText, key });
  };

  const endWithFailure = () => {
    message.error({
      content: "Error occured, check auth credentials",
      duration: 2,
      key,
    });
  };

  const endWithSuccess = () => {
    message.success({
      content: "Success",
      duration: 2,
      key,
    });
  };

  return { startLoading, endWithFailure, endWithSuccess };
};
