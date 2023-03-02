export const SET_USUARIOS = (state, usuarios) => {
  state.users = usuarios
}

export const POST_PERSONAL = (state, personal) => {
  state.registroPersonal.push(personal)
}
