module Types
  class MutationType < Types::BaseObject
    field :create_chatroom, mutation: Mutations::CreateChatroom
    field :update_chatroom_description, mutation: Mutations::UpdateChatroomDescription
    field :resolve_chatroom, mutation: Mutations::ResolveChatroom
  end
end
