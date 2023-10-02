import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardProps,
  Collapse,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";

import { CreateChatroomEditDescModal } from "./CreateChatroomEditDescModal";
import { ChatroomDataFragment } from "~src/codegen/graphql";
import { ChatroomTags } from "./ChatroomTags";

const ChatroomCard = styled(Card)<CardProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
}));

export type ChatroomListItemProps = {
  chatroom: ChatroomDataFragment;
};

export const ChatroomListItem: React.FC<ChatroomListItemProps> = ({
  chatroom,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showCreateChatroomModal, setShowCreateChatroomModal] = useState(false);

  const natureCodeName = chatroom.natureCode?.name ?? "Uncategorized";

  return (
    <ChatroomCard variant="outlined">
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h6">{chatroom.label}</Typography>
          <ChatroomTags
            natureCode={natureCodeName}
            callerPhoneNumber={chatroom.callerPhoneNumber}
          />
        </Box>
        <IconButton onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </Box>
      <Collapse in={showDetails}>
        <Card sx={{ padding: 2 }}>
          <Typography variant="body1">Description</Typography>
          <Typography variant="body2">
            {chatroom.description ?? "No description provided."}
          </Typography>
          { <Box display="flex" justifyContent="flex-end" marginTop={2} gap={1}>
              <Button
                size="small"
                variant="contained"
                onClick={() => setShowCreateChatroomModal(true)}
              >
                Edit
              </Button>
            </Box>
          }          
        </Card>
      </Collapse>
      <CreateChatroomEditDescModal
        open={showCreateChatroomModal}
        handleClose={() => setShowCreateChatroomModal(false)}
        chatroomId={chatroom.id}
        description={chatroom.description ?? ""}
      />
    </ChatroomCard>
  );
};
