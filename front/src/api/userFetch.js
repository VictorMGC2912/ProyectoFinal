const userUrlBack = 'http://localhost:9000/users/';
const signup = 'signup';

export const getAllUsers = async () => {
    //Peticion al back de todos los usuarios
    const response = await fetch(userUrlBack);
    const users = await response.json();
    return users;
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
