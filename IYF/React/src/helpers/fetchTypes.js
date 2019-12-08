import axios from "axios";

export default () => {
  return axios
    .get("http://localhost:8081/api/documents/types")
    .catch(error => {
      console.log(error);
    })
    .then((res) => res.data );

};
