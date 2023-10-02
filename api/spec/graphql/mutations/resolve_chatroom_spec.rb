require "rails_helper"

RSpec.describe "Mutations::ResolveChatroom", type: :request do
  let(:chatroom) { create(:chatroom) }
  let(:id) { "1234" }
  let(:variables) do
    {
      id: id
    }.to_json
  end
  
  let(:query) do
    <<~GQL
      mutation ResolveChatroom(
        $id: ID!
      ) {
        resolveChatroom(
          input: {
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

    chatroom = Chatroom.find(response_json['data']['resolveChatroom']['chatroom']['id'])
    
    expect(chatroom).to be_truthy
    expect(chatroom.resolved).to eq(true)
  end

  context "when required fields are not provided" do
    let(:id) {nil}

    it "returns an error" do
      expect { post '/graphql', params: { query:, variables: } }.to raise_error(ArgumentError, "'id' is required"}
  

      response_json = JSON.parse(response.body)
      expect(response_json["errors"].count).to be > 0
    end
  end
end