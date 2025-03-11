import * as React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

interface InputBarProps {
  onChangeCallback: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void
}

function InputBar({ onChangeCallback }: InputBarProps) {
  let [inputs, setInputs] = React.useState<React.JSX.Element[]>([
    <TextField
      id="expression-input-0"
      label="Series 0"
      variant="outlined"
      key={0}
      onChange={(event) => onChangeCallback(event, 0)}
    />
  ]);

  function newInput() {
    setInputs(prevInputs => [
      ...prevInputs,
      <TextField
        id={`expression-input-${inputs.length}`}
        label={`Series ${inputs.length}`}
        variant="outlined"
        key={inputs.length}
        onChange={(event) => onChangeCallback(event, inputs.length)}
      />
    ]);
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

