import { Box, Card, Modal } from "@mui/material";
import { formatErrorMessage } from "../utils/formatErrorMessage";
import {
  ArchivedChatroomsListDocument,
  ChatroomsListDocument,
  useResolveChatroomMutation
} from "~src/codegen/graphql";
import { CreateConfirmationModal } from "./CreateConfirmationModal";

export type ChatroomResolveModalProps = {
  open: boolean;
  handleClose: () => void;
  chatroomId: string;
  label: string;
};

const TRACE_ID: string = "CreateChatroomResolveModal";

export const CreateChatroomResolveModal: React.FC<ChatroomResolveModalProps> = ({
  open,
  handleClose,
  chatroomId,
  label
}) => {
  const TEXT_RESOLVE_CONFIRMATION_TITLE: string = "Resolving this chatroom?";
  const TEXT_RESOLVE_CONFIRMATION_DESCRIPTION: string = `The chatroom named <${label}> will be transfert to 'Archive' section.`;

  const [resolveChatroom] = useResolveChatroomMutation({
    refetchQueries: [ChatroomsListDocument, ArchivedChatroomsListDocument],
  });

  const handleSubmit = async () => {
    resolveChatroom({variables:{id:chatroomId}})
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
            <CreateConfirmationModal
              open={open}
              handleCancel={handleClose}
              handleConfirm={handleSubmit}
              title={TEXT_RESOLVE_CONFIRMATION_TITLE}
              description={TEXT_RESOLVE_CONFIRMATION_DESCRIPTION}
            />
          )}
        </Card>
      </Box>
    </Modal>
  );
};
