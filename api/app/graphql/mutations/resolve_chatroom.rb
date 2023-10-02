module Mutations
    class ResolveChatroom < BaseMutation
      argument :id, ID, required: true
  
      # fields
      field :chatroom, Types::ChatroomType, null: false
  
      # resolver
      def resolve(id:)
        chatroom = Chatroom.find_by(id: id)
        return unless chatroom
        
        chatroom.update(resolved: true)

        {
          chatroom: chatroom
        }
      end
    end
  end