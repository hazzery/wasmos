import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import * as React from 'react';

interface InputBarProps {
  onChangeCallback: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void,
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
          overflow: "scroll",
          minWidth: "200px",
        }}
      >
        {inputs}
        <Button
          onClick={newInput}
        ><AddIcon /></Button>
      </Paper >
    </>
  );
}

export default InputBar;

