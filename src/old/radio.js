import React, { Component } from 'react';

class Radio extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedOption: null
    };
  }

handleOptionChange = changeEvent => {
  this.setState({
    selectedOption: changeEvent.target.value
  });
};

  render() {
    return (
      <form>
            <input
              className="subquestion"
              type="text"
              placeholder={this.props.PROP}
              style = {{font:'italic'}}
              value={this.props.PROP}
            />
            {new Array(this.props.colCount).fill(0).map((el, id)=>(
                <input
                  type="radio"
                  name={`question`}
                  value={`option-${id}`}
                  checked={this.state.selectedOption === `option-${id}`}
                  onChange={this.handleOptionChange}
                />
            ))}


      </form>
    );
  }
}

export default Radio;
