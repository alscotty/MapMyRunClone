export const getUsers = () => (
    $.ajax({
        url: '/api/users'
    })
)