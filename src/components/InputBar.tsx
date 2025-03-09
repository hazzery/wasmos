import * as React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

function InputBar() {
  let [inputs, setInputs] = React.useState<React.JSX.Element[]>([
    <TextField
      id="expression-input-0"
      label="Input expression"
      variant="outlined"
      key={0}
    // onChange={(event) => graph(event.target.value)}
    />
  ]);

  function newInput() {
    console.log("clicked!");
    inputs.push(
      <TextField
        id={`expression-input-${inputs.length}`}
        label="Input expression"
        variant="outlined"
        key={inputs.length}
      // onChange={(event) => graph(event.target.value)}
      />
    )
    setInputs(inputs);
  }

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          padding: "10px",
        }}
      >
        {inputs}
        <TextField
          onClick={newInput}
          id="disabled-input"
          label="New expression"
          variant="outlined"
        // onChange={(event) => graph2(event.target.value)}
        />
      </Paper >
    </>
  );
}

export default InputBar;

