import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import React from 'react';

class FileUpl extends React.Component {
    render () {
    return (
      <FilePond
        allowMultiple={true}
        maxFiles={3}
        server={
          "http://localhost:8081/file/downloadFile/" +
          this.props.fileNameGetter()
        }
      />
    );
};
}
export default FileUpl;