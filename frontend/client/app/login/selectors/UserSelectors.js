const currentUser = (state) => state.user.user

export const isAdmin = (state) => {
    const user = currentUser(state)
    if (user) {
        return user.is_superuser
    }
    return false
}

export const isLoggedIn = (state) => {
    const user = currentUser(state)
    if (user) {
        return user.is_staff
    }
    return false
}