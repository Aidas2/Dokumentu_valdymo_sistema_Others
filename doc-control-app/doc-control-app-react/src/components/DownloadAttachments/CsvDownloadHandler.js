import Axios from "axios";
import extractFileName from "./ExtractFileName";
export default function csvDownloadHandler(event, props) {
  event.preventDefault();
  Axios({
    url: "/api/docs/csv/download",
    method: "GET",
    responseType: "blob" // important
  })
    .then(response => {
      var filename = extractFileName(response.headers["content-disposition"]);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); //or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(err => {
      props.showResponseMessage("Neturite dokumentų.", "danger", 2500);
    });
}
