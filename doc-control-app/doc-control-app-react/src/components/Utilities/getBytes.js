const sufixes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
function getBytes(bytes) {
  const i = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    (!bytes && "0 Bytes") ||
    (bytes / Math.pow(1000, i)).toFixed(0) + " " + sufixes[i]
  );
}
export default getBytes;
