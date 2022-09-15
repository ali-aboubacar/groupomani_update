import React, { Component } from 'react'
import './style.css'
import Sidebar from '../../components/Sidebar'
import axios from 'axios'

export default class Sendpost extends Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      title:'',
      content:'',
      imageFile: null
  }
}



  onFieldChange(e) {
    this.setState({
      title: document.getElementById('title').value,
      content: document.getElementById('content').value
    });
}

onFileChange(e) {
  this.setState({imageFile: e.target.files[0]});
}

 onSubmit(e) {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', this.state.title);
    formDataToSend.append('content', this.state.content);
    formDataToSend.append('file', this.state.imageFile);
    // e.target.reset();

  //   const config = {     
  //     headers: { 'content-type': 'multipart/form-data' }
  // }
    axios.post("http://localhost:4000/api/posts", formDataToSend)
    .then(res=>{console.log(res)});

  }

render(){
  return (
    <section className="home-section">
    <Sidebar/>
    <div className="card text-center m-3">
            <form onSubmit={this.onSubmit}>
            <input name="title" type="text" id="title"placeholder='post title' onChange={this.onFieldChange}/>
            <textarea name="content" id="content" cols="30" rows="10" onChange={this.onFieldChange} placeholder="enter content"></textarea>
            <input name="imageFile" type="file" onChange={this.onFileChange}/>
            <input type="submit" value="valider" />
            </form>
        </div>
  </section>
  )
}
}
