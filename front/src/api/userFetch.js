const userUrlBack = 'http://localhost:9000/users/';

export const getAllUsers = async () => {
    //Peticion al back de todos los usuarios
    const response = await fetch(userUrlBack);
    const users = await response.json();
    return users;
};
