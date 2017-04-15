export const addOrRemoveId = (list, id) => {
    if (!list.find(x => x === id)){
        return [...list, id]
    } else {
        return list.filter(x => x !== id)
    }
}

