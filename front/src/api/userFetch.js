const userUrlBack = 'http://localhost:9000/users/';
const signup = 'signup';

export const getUser = async (id) => {
    //Peticion al back de todos los usuarios
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
