
module Mutations
    class UpdateChatroomDescription < BaseMutation
      argument :description, String, required: true
      argument :id, ID, required: true
  
      # fields
      field :chatroom, Types::ChatroomType, null: false
  
      # resolver
      def resolve(description:, id:)
        chatroom = Chatroom.find_by(id: id)
        return unless chatroom
        
        chatroom.update(description: description)

        {
          chatroom: chatroom
        }
      end
    end
  end