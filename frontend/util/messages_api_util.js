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

export const createMessage = message => (
    $.ajax({
        method: 'POST',
        url: '/api/messages',
        data: { message }
    })
)

export const updateMsg = message => (
    $.ajax({
        method: 'UPDATE',
        url: `/api/messages/${message.id}`
    })
)

export const removeMessage = message => (
    $.ajax({
        method: "DELETE",
        url: `api/messages/${message.id}`
    })
)