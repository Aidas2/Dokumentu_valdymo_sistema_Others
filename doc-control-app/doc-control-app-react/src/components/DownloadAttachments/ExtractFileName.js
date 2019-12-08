export default function extractFileName(contentDispositionValue) {
  var filename = "";
  if (
    contentDispositionValue &&
    contentDispositionValue.indexOf("attachment") !== -1
  ) {
    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    var matches = filenameRegex.exec(contentDispositionValue);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, "");
    }
  }
  return filename;
}
