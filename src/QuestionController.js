import React from 'react';
import { Question } from './Question';


export const QuestionController = props => {
  //the props being used in this component
  const { onAddRow, onAddColumn, ...restProps } = props;
  
  return(
    <React.Fragment>
      {/*passing down all the props to the Question component*/}
      <Question {...restProps}/>
      <button onClick={onAddRow}>ADD ROW</button>
      <button onClick={onAddColumn}>ADD COL</button>
    </React.Fragment>
  );
};