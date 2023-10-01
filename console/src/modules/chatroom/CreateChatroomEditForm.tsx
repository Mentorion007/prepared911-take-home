import {
    Box,
    Button,
    CircularProgress,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
  } from "@mui/material";
  import { useState } from "react";
  
  //import { useNatureCodesQuery } from "~src/codegen/graphql";
  
  type CreateChatroomEditFormState = {
    description: string;
  };
  
  const isFormValid = (formState: CreateChatroomEditFormState): boolean => {
    return true;
  };
  
  export type CreateChatroomEditFormProps = {
    handleClose: () => void;
    onSubmit: (values: CreateChatroomEditFormState) => Promise<void>;
    description: string;
  };
  
  export const CreateChatroomEditForm: React.FC<CreateChatroomEditFormProps> = ({
    handleClose,
    onSubmit,
    description
  }) => {
    //const natureCodesQuery = useNatureCodesQuery();
    //const natureCodes = natureCodesQuery.data?.natureCodes ?? [];
  
    const [isSubmitting, setIsSubmitting] = useState(false);
    const defaultFormState = (): CreateChatroomEditFormState => ({
    description: description
  });
    const [values, setValues] =
      useState<CreateChatroomEditFormState>(defaultFormState);
  
    const [isDescriptionChanged, setIsDescriptionChanged] = useState(false);
    const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      const name = event.target.name as keyof CreateChatroomEditFormState;
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
  