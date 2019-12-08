import React, { Component } from 'react';
import axios from 'axios';
import {FileSaver, saveAs} from 'file-saver'

export class ZipDownload extends Component {

    handleZip = () => {        
        axios(`http://localhost:8099/api/file/downloadZip/${this.props.email}`, {
          method: 'GET',
          responseType: 'arraybuffer', 
        // responseType: 'blob',//Force to receive data in a Blob Format
          header: 'Content-disposition', 
      })
      .then(response => {
        console.log("Response zip", response.data);
        const data = response.data;
        // var blob = new Blob([data],{type:'application/zip'});
            // saveAs(blob, "registrazioni.zip");

        var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    if ( URL ) {
        var blob = new Blob([data],{type:'application/zip'});
        var url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'files.zip');
        document.body.appendChild(link);
        link.click();
    }
        })
            .catch(error => {
                console.log(error);
            })
    }
                
  render() {
    return (
      <div>
         <button className="btn btn-primary" onClick={this.handleZip.bind(this)}>Atisiųsti archyvą</button> 
      </div>
    )
  }
}

export default ZipDownload
