export const getMessages = () => (
    $.ajax({
        method: 'GET',
        url: '/api/messages'
    })
)

export const getChannelMessages = channelId => (
    $.ajax({
        method: 'GET',
        url: `/api/channels/${channelId}/messages`
    })
)