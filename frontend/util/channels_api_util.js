export const fetchChannels = () => (
    $.ajax({
        method: "GET",
        url: "/api/channels"
    })
)

export const fetchMyChannels = userId => (
    $.ajax({
        method: "GET",
        url: `/api/users/${userId}/channels`
    })
)

export const fetchChannelUsers = channelId => (
    $.ajax({
        method: 'GET',
        url: `/api/channels/${channelId}/users`
    })
)

export const createChannel = channel => (
    $.ajax({
        method: 'POST',
        url: '/api/channels/create',
        data: channel
    })
)