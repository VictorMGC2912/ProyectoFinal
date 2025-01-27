const userUrlBack = 'http://localhost:9000/user/';
const signup = 'signup';

export const getUser = async (id) => {
    //Peticion al back del usuario
    const response = await fetch(userUrlBack+id);
    const user = await response.json();
    return user;
};

//CREAR USUARIOS
export const createUser = async (bodyParam) => {
    const response = await fetch(userUrlBack+signup, {
        method: 'POST',
        headers:{"Content-Type": "application/json"},
        body: bodyParam
    })
    const userCreated = await response.json();
    if(userCreated.error) console.log(userCreated.error)
    console.log(userCreated)
    return
};

//PARA ACTUALIZAR DATOS USUARIO
export const updateUser = async (id, bodyParam) => {
    const response = await fetch(userUrlBack+id, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyParam)
    })
    const userUpdate = await response.json()
    if(userUpdate.error) console.log(userUpdate.error)
    console.log(userUpdate)
    return await userUpdate
};
