import { toast } from "react-toastify";

const showTest = ({ type, message }) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export default showTest;
