import {
    Box,
    Button,
    Card,
    CircularProgress,
    Modal,
    TextField,
    Typography,
  } from "@mui/material";
  import { useState } from "react";

export type ConfirmationModalProps = {
  open: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
  title: string;
  description: string;
};

export const CreateConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  handleCancel,
  handleConfirm,
  title,
  description
}) => {
  const handleCancelClick  = () => {
    handleCancel();
  }

  const handleConfirmClick  = () => {
    handleConfirm();
  }

  const attributes = {
    readonly: true
  }

  return (
    <Modal open={open} onClose={handleCancelClick}>
      <Box
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ inset: 0 }}
      >
        <Card variant="outlined" sx={{ minWidth: 400, padding: 2 }}>
          {open && (
            <div>
                <Typography variant="h6" sx={{ marginBottom: 4 }}>
                {title}
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  size="small"
                  label=""
                  name="description"
                  value={description}
                  rows={4}
                  disabled
                  multiline
                  variant="outlined"
                  {...attributes}
                />
                <Box display="flex" justifyContent="flex-end" marginTop={4} gap={1}>
                  <Button
                    size="small"
                    variant="text"
                    color="primary"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={handleConfirmClick}
                  >
                    Confirm
                  </Button>
                </Box>
              </Box>
            </div>
          )}
        </Card>
      </Box>
    </Modal>
  );
};
