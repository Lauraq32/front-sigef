/* eslint-disable prettier/prettier */



//actualizar una entrada
export const updateEntries = async ({ commit }, entry) => {

    //servicios journalApi
    const { date, picture, text } = entry
    const dataTosave = { date, picture, text }

    const resp = await journalApi.put(`/entries/${entry.id}.json`, dataTosave)
    console.log(resp)

    //commit de una mutation
    commit('updateEntries', { ...entry })
}

//borrar
export const deleteEntry = async ({ commit }, id) => {

    //servicios journalApi
    await journalApi.delete(`/entries/${id}.json`)

    commit('deleteEntry', id)

    return id


}




