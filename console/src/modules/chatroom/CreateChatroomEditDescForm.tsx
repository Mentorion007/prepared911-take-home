import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography,
  } from "@mui/material";
  import { useState, useRef } from "react";
  
  type CreateChatroomEditDescFormState = {
    id: string;
    description: string;
  };
  
  export type CreateChatroomEditDescFormProps = {
    handleClose: () => void;
    onSubmit: (values: CreateChatroomEditDescFormState) => Promise<void>;
    description: string;
  };
  
  export const CreateChatroomEditDescForm: React.FC<CreateChatroomEditDescFormProps> = ({
    handleClose,
    onSubmit,
    description
  }) => {  
    const [isSubmitting, setIsSubmitting] = useState(false);
    const defaultFormState = (): CreateChatroomEditDescFormState => ({
      description: description,
      id: ""
    });

    const [values, setValues] =
      useState<CreateChatroomEditDescFormState>(defaultFormState);
  
    const [isDescriptionChanged, setIsDescriptionChanged] = useState(false);
    const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      const name = event.target.name as keyof CreateChatroomEditDescFormState;
      const value = event.target.value;
      const formattedValue = value;
  
      setIsDescriptionChanged(description != formattedValue);
      setValues({ ...values, [name]: formattedValue });
    };
    
    const handleSubmit: React.FormEventHandler = async (event) => {
      event.preventDefault();
  
      setIsSubmitting(true);
      await onSubmit(values);
      setIsSubmitting(false);
  
      handleClose();
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" sx={{ marginBottom: 4 }}>
          Edit your description
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            size="small"
            label="Description"
            name="description"
            value={values.description}
            onChange={handleTextChange}
            autoFocus
            rows={4}
            multiline
          />
          <Box display="flex" justifyContent="flex-end" marginTop={4} gap={1}>
            <Button
              size="small"
              variant="text"
              color="primary"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isDescriptionChanged}
              startIcon={
                isSubmitting ? (
                  <CircularProgress color="inherit" sx={{ fontSize: "1em" }} />
                ) : null
              }
            >
              Save
            </Button>
          </Box>
        </Box>
      </form>
    );
  };
  