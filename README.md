# Quarrel

Quarrel is a chat app modeled after Slack, but for casual discussions.
Demo: http://quarreling.herokuapp.com/

<img src="demo.gif">

## Languages/Tech
- Ruby on Rails
- JavaScript
- [React/Redux](https://react-redux.js.org/)
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [Action Cable](https://edgeguides.rubyonrails.org/action_cable_overview.html) (to setup WebSocket connection)
- [Quill](https://quilljs.com/) (rich text editor)
- [Emoji Mart](https://github.com/missive/emoji-mart)

## Selected features and code examples
### User authentication implemented with Rails
I use a random number generator to create a session token and BCrypt to encrypt users' passwords. Users are verified by their email and password (checked against the password digest).
<details>
  <summary>Example Code</summary>
  
  ```rb
    def self.find_by_credentials(email, password)
      user = User.find_by(email: email)
      return nil unless user && user.is_password?(password)
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_token!
        self.session_token = SecureRandom.urlsafe_base64(16)
        self.save!
        self.session_token
    end

    private

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64(16)
    end
 ```
    
</details>

### Channels list and search
For my channels list component, I use a local state variable to keep track of what users type. These search queries are
then used to filter channels with JavaScript's built-in substrings function.
<details>
  <summary>Example Code</summary>
  
  ```jsx
  this.state = {
    value: ''
  };
  
  getChannels() {
    return Object.values(this.props.channels).filter(x => x.channel_name.toLowerCase().search(this.state.value) != -1);
  }
    
  <AutoSizer>
    {({ height, width }) => (
      <List
        height={height}
        width={width}
        itemCount={searchChannels.length+1}
        itemSize={index => index > 0 ? 50 : 22}
        itemData={{ 
          channels: searchChannels.sort((a,b) => (a.channel_name.toLowerCase() < b.channel_name.toLowerCase()) ? -1 : 1),
          history: this.props.history,
          handleClose: this.handleCloseChannels,
          memberships: this.props.memberships
        }}
       >
         {Row}
       </List>
     )}
 </AutoSizer>
  ```
</details>

### Message component interprets media links (YouTube, jpg, png, gif)
The message component wraps a message based on its contents. Currently, saved messages are the main contents. I plan to
make this more flexible with the input from the Quill text editor so that messages also support formatting and code blocks.
<details>
  <summary>Example Code</summary>
  
  ```jsx
  const youtubeParser = url => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

function createMsgBody(msgBody) {
    const mediaExt = 'jpg jpeg png gif svg'.split(' ');
    let res = msgBody;
    if (validator.isURL(msgBody)) {
        let urlParts = msgBody.split('.');
        let ext = urlParts[urlParts.length - 1];
        if (mediaExt.includes(ext)) {
            res = (
                <img src={msgBody} style={{maxHeight: "360px", maxWidth: "360px"}}></img>
            );
        } else if (youtubeParser(msgBody)) {
            res = (
                <YouTube
                    videoId={youtubeParser(msgBody)}
                    opts={{
                        playerVars: {
                            autoplay: -1
                        }
                    }}
                />
            )
        } else {
            res = (<a href={msgBody} target="_blank">{msgBody}</a>)
        }
    }
    return res;
}
  ```
</details>

### Realtime messaging with Action Cable (framework that integrates WebSockets with Rails)
Instant messaging is handled by Action Cable. This works by opening channels of communication, allowing my app to use
a WebSocket connection.
<details>
  <summary>Example Code</summary>
  
  ```rb
  class Api::MessagesController < ApplicationController

    def create
        @message = current_user.messages.new(message_params) 
        @message.user = current_user
        if @message.save
            message_cable(@message)
            render json: @message
        else
            render json: @message.errors.full_messages, status: 422
       end
    end

    private

    def message_cable(message)
        ActionCable.server.broadcast(
            "messages#{message.channel_id}",
            id: message.id,
            body: message.body,
            user_id: message.user_id,
            channel_id: message.channel_id,
            created_at: message.created_at
        )
    end
end

class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messages#{params[:channelId]}"
  end
end
  ```
</details>
  
###
| File | Description |
| --- | --- |
| [components](https://github.com/LanceSanity/Quarrel/tree/master/frontend/components) | Container and presentational components |
| [actions](https://github.com/LanceSanity/Quarrel/tree/master/frontend/actions) | These actions can be dispatched to trigger a Redux state change. They return POJOs that tell the reducer what the state should look like. Some of these actions also include async calls via middleware.|
| [reducers](https://github.com/LanceSanity/Quarrel/tree/master/frontend/reducers) | Reducers specify how the state changes in response to dispatched actions. |
| [util](https://github.com/LanceSanity/Quarrel/tree/master/frontend/util) | Defines functions that make API calls to Quarrel's backend. |
| [controllers](https://github.com/LanceSanity/Quarrel/tree/master/app/controllers) |The API controllers define what happens given a requested route. The application controller defines helper methods for the backend.|
| [models](https://github.com/LanceSanity/Quarrel/tree/master/app/models) | Maps database tables to Ruby objects, defines model level validations, specifies associations.
| [routes](https://github.com/LanceSanity/Quarrel/blob/master/config/routes.rb) | Declares URIs for the backend. |
