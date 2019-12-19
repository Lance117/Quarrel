# Quarrel

Quarrel is a chat app modeled after Slack, but for casual discussions.

Try it out: [demo](http://quarreling.herokuapp.com/)

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

## Current features
- User authentication implemented with Rails
- Create, join, and leave channels
- Create and delete messages
- Realtime messaging with Action Cable (framework that integrates WebSockets with Rails)
- Messages support media links (jpg, png, gif, youtube links)
