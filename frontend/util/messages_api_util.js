export const fetchMessages = () => (
    $.ajax({
        method: 'GET',
        url: '/api/messages'
    })
)

export const fetchChannelMessages = channelId => (
    $.ajax({
        method: 'GET',
        url: `/api/channels/${channelId}/messages`
    })
)