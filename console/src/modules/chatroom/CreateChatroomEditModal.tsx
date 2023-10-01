import { Box, Card, Modal } from "@mui/material";
import {
  ChatroomsListDocument,
  useCreateChatroomMutation,
} from "~src/codegen/graphql";
import {
  CreateChatroomEditForm,
  CreateChatroomEditFormProps,
} from "./CreateChatroomEditForm";

export type CreateChatroomEditModalProps = {
  open: boolean;
  handleClose: () => void;
  description: string;
};

export const CreateChatroomEditModal: React.FC<CreateChatroomEditModalProps> = ({
  open,
  handleClose,
  description
}) => {
  const [createChatroom] = useCreateChatroomMutation({
    refetchQueries: [ChatroomsListDocument],
  });

  const handleSubmit: CreateChatroomEditFormProps["onSubmit"] = async (
    variables
  ) => {
    //createChatroom({ variables });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ inset: 0 }}
      >
        <Card variant="outlined" sx={{ minWidth: 400, padding: 2 }}>
          {open && (
            <CreateChatroomEditForm
              onSubmit={handleSubmit}
              handleClose={handleClose}
              description={description}
            />
          )}
        </Card>
      </Box>
    </Modal>
  );
};
