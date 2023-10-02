import { Box, Card, Modal } from "@mui/material";
import { formatErrorMessage } from "../utils/formatErrorMessage";
import {
  ChatroomsListDocument,
  useUpdateChatroomDescriptionMutation
} from "~src/codegen/graphql";
import {
  CreateChatroomEditDescForm,
  CreateChatroomEditDescFormProps,
} from "./CreateChatroomEditDescForm";

export type UpdateChatroomDescModalProps = {
  open: boolean;
  handleClose: () => void;
  chatroomId: string;
  description: string;
};

const TRACE_ID: string = "CreateChatroomEditDescModal";

export const CreateChatroomEditDescModal: React.FC<UpdateChatroomDescModalProps> = ({
  open,
  handleClose,
  chatroomId,
  description
}) => {
  const [updateChatroomDescription] = useUpdateChatroomDescriptionMutation({
    refetchQueries: [ChatroomsListDocument],
  });

  const handleSubmit: CreateChatroomEditDescFormProps["onSubmit"] = async (
    variables
  ) => {
    variables.id = chatroomId;
    updateChatroomDescription({ variables })
    .catch(e => {
      console.log(formatErrorMessage(TRACE_ID, "handleSubmit", e));
    });
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
            <CreateChatroomEditDescForm
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
