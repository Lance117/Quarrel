export const fetchChannels = () => (
    $.ajax({
        method: "GET",
        url: "/api/channels"
    })
)

// export const fetchMyChannels = userId => (
//     $.ajax({
//         method: "GET",
//         url: `/api/users/${userId}/channels`
//     })
// )

// export const fetchChannelUsers = channelId => (
//     $.ajax({
//         method: 'GET',
//         url: `/api/channels/${channelId}/users`
//     })
// )

export const updateCh = channel => (
    $.ajax({
        method: 'PATCH',
        url: `/api/channels/${channel.id}`,
        data: { channel }
    })
)

export const createChannel = channel => (
    $.ajax({
        method: 'POST',
        url: '/api/channels',
        data: { channel }
    })
)

export const removeChannel = channel => (
    $.ajax({
        method: "DELETE",
        url: `api/channels/${channel.id}`
    })
)