export const allChannels = ({ channels }) => Object.keys(channels).map(id => channels[id]);
export const allMessages = ({ messages }) => Object.keys(messages).map(id => messages[id]);