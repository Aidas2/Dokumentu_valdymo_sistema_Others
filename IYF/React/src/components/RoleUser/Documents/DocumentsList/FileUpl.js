import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import React from 'react';

class FileUpl extends React.Component {
    render () {
    return(
        <FilePond 
        allowMultiple={true} 
        server="http://localhost:8081/file/downloadFile/{fileName}" />
    );
};
}
export default FileUpl;