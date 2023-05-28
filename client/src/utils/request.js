import axios from "axios";
import showToast from "./toast";

const request = ({
  callback = () => {},
  error_callback = () => {},
  method,
  url,
  titleSuccess,
  titleError,
  withNotification = false,
  data,
}) => {
  axios({ url, data, method })
    .then((response) => {
      callback(response);
      showToast({ message: titleSuccess, type: "success" });
    })
    .catch((error) => {
      withNotification &&
        showToast({
          message: titleError + "\n\n" + error?.response?.data?.message,
          type: "error",
        });
      console.error(error);
      error_callback(error);
    });
};

export default request;
