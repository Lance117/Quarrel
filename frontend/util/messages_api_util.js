export const fetchMessages = () => (
    $.ajax({
        method: 'GET',
        url: '/api/messages'
    })
)