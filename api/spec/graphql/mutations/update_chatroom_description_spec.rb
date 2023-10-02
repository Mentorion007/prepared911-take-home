require "rails_helper"

RSpec.describe "Mutations::UpdateChatroomDescription", type: :request do
  let(:chatroom) { create(:chatroom) }
  let(:description) { "Chatroom description" }
  let(:id) { "1234" }
  let(:variables) do
    {
      description: description,
      id: id
    }.to_json
  end
  
  let(:query) do
    <<~GQL
      mutation UpdateChatroomDescription(
        $description: String!
        $id: ID!
      ) {
        updateChatroomDescription(
          input: {
            description: $description
            id: $id
          }
        ) {
          chatroom {
            id
            label
            description
            callerPhoneNumber
            natureCode {
              id
              name
            }
          }
        }
      }    
    GQL
  end

  it "update the target chatroom description" do
    expect { post '/graphql', params: { query:, variables: } }.to_not change { Chatroom.count }

    response_json = JSON.parse(response.body)

    chatroom = Chatroom.find(response_json['data']['updateChatroomDescription']['chatroom']['id'])
    
    expect(chatroom).to be_truthy
    expect(chatroom.description).to eq(description)
  end

  context "when required fields are not provided" do
    let(:description) {nil}

    it "returns an error" do
      expect { post '/graphql', params: { query:, variables: } }.to_not change { Chatroom.count }
  
      response_json = JSON.parse(response.body)
      expect(response_json["errors"].count).to be > 0
    end
  end
end