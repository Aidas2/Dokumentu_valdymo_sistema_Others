import React, { Component } from 'react';
import axios from 'axios';

export default class UploadFile extends Component {

    constructor() {
        super();
       
        this.state = {
            selectedFile: null, 
            loaded: 0,
        }
      }

      handleselectedFile = event => {
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
      }

      handleUpload = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile, this.state.selectedFile.name)
    
        console.log("file", this.state.selectedFile.name)
        axios.post('http://localhost:8099/api/file/uploadFile',{
            onUploadProgress: ProgressEvent => {
                this.setState({
                  loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                })
              },
        })
        .then(function(response) {
              console.log(response);
          }).catch(function (error) {
              console.log(error);
          })

      }
    
  render() {
    return (
      <div>
        <input type="file" name="" id=""  onChange={this.handleselectedFile}/>
        <button onClick={this.handleUpload}>Upload</button>
        <div> {Math.round(this.state.loaded,2) } %</div>
      </div>
    )
  }
}
