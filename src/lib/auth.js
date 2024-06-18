
//function to check if there's a payload, i.e. if user is logged in or not
export function getPayload() {
    const token = localStorage.getItem("token")

    if (!token) return false

    const parts = token.split('.')
    //Grab public bit of token, decode it (atob), turn into an object(JSON.parse)
    return JSON.parse(atob(parts[1]))
}

export function isAddedBy(userId) {
    const payload = getPayload()
    if (!payload) return false
    return userId === payload.userId
}

export function isAdmin() {
    const payload = getPayload()
    return payload.isAdmin
}