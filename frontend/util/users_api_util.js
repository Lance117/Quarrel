export const fetchUsers = () => (
    $.ajax({
        method: 'GET',
        url: '/api/users'
    })
)

export const fetchUser = user => (
    $.ajax({
        method: 'GET',
        url: `/api/users/${user.id}`
    })
)