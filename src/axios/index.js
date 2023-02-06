import axios from "axios";

export const myaxios = axios.create({
  baseURL: "https://api.wishx.me",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },

});
