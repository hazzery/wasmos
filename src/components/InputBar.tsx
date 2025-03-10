import * as React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

interface InputBarProps {
  onChangeCallback: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

function InputBar({ onChangeCallback }: InputBarProps) {
  let [inputs, setInputs] = React.useState<React.JSX.Element[]>([
    <TextField
      id="expression-input-0"
      label="Input expression"
      variant="outlined"
      key={0}
      onChange={onChangeCallback}
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
        onChange={onChangeCallback}
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
        />
      </Paper >
    </>
  );
}

export default InputBar;

