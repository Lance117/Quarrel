const fetchMemberships = () => (
    $.ajax({
        method: 'GET',
        url: '/api/memberships'
    })
)

export default fetchMemberships