import React, { Component } from 'react';
import { QuestionController } from './QuestionController';
import axios from 'axios';

class App extends Component {
  //initial state
  state = {
    rows: [],
    columns: [],
    questionId:''
  }
  
  componentDidMount() {
    //Create a new question
     axios.post('https://assignment-bonno42.c9users.io:8081/api')
      .then(res=>{
        this.setState({
          rows: res.data.rows || [],
          columns: res.data.columns || [],
          questionId: res.data._id
        });
      })
      .catch(err=>{
        console.log(err);
      });
    
    /*axios.get('https://assignment-bonno42.c9users.io:8081/api')
      .then(res=>{
        console.log('data arrived', res)
        this.setState({rows: res.data.rows, columns: res.data.columns});
      });*/
  }
  
  save() {
    axios.put(`https://assignment-bonno42.c9users.io:8081/api/${this.state.questionId}`,{
      rows: this.state.rows,
      columns: this.state.columns
    })
      .then(res=>{
        console.log('Saved on the server');
      })
      .catch(err=>{
        console.log(err);
      });
  }
  
  //add row button logic. 
  addRow = () => {
    this.setState({ rows: [...this.state.rows, `row${this.state.rows.length +1}`]}, this.save);
  }
  
  //add column button logic
  addColumn = () => {
    this.setState({ columns: [...this.state.columns, `col${this.state.columns.length +1}`]}, this.save);
  }
  
  //delete row button logic
  delRow = (index) => {
    const newRows = [...this.state.rows];
    newRows.splice(index,1);
    this.setState({rows: newRows}, this.save);
  }
  
  //delete column button logic
  delCol = (index) => {
    const newCols = [...this.state.columns];
    newCols.splice(index,1);
    this.setState({columns: newCols}, this.save);
  }

  handleEditLabel = e => {
    // console.log(e.currentTarget);
    const { name, value } = e.currentTarget;
    const index = e.currentTarget.getAttribute('index');
    const newState = [...this.state[name]];
    newState[index] = value;
    this.setState({[name]: [...newState]}, this.save);
  }


  render() {
    //destructuring state into variables (rows = this.state.rows)
    const { rows, columns } = this.state;
    //joined rows and columns arrays to search for a longest and shortest strings
    let arrayJoined = [...this.state.columns, ...this.state.rows];
    //finds the shortest string in the joined array
    let min = Math.min.apply(Math, arrayJoined.map(function(str) { return str.length; }));
    //finds the longest string in the joined array
    let longest = Math.max.apply(Math, arrayJoined.map(function(str){return str.length}));

    return (
      <React.Fragment>  
        <div className="split left">
          <div className="centered">
            <QuestionController rows={rows} columns={columns} delCol={this.delCol} delRow={this.delRow} onAddRow={this.addRow} onAddColumn={this.addColumn} onEditLabel={this.handleEditLabel} />
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <h2> Summary </h2> <br/>
            Number of rows: {this.state.rows.length} <br/>
            Number of columns: {this.state.columns.length} <br/>
            {/*Number of images uploaded: <br/>*/} 
            Longest label: {longest} <br/>
            Shortest label: {min} <br/>
          </div>
        </div>
      </React.Fragment>  
    );
  }
}

export default App;