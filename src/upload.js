import React, { Component } from 'react';
import axios from 'axios';

class Upload extends Component {
  state = {
    selectedFile: null
  }
  fileSelectedHandler = event =>{
    this.setState({
      selectedFile: event.target.files[0]
    })
  }
  fileUploadHandler = () => {
    axios.post('');
  }
  
  render() {
    return(
      <div>
        <input type="file" onChange={this.fileSelectedHandler}/>
      </div>
      );
    }
}

export default Upload;
