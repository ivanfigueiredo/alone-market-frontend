import Cookies from 'js-cookie';

export const isLogged = () => {
    let token = Cookies.get('token');
    return (token) ? true : false;
}

export const myToken = () => {
    const myToken = Cookies.get('token');
    return(myToken);
}

export const isAdmin = () => {
    const admin = Cookies.get('eAdmin');
    return (admin);
}

export const doAdmin = (eAdmin) => {
    Cookies.set('eAdmin', eAdmin);
}

export const doLogin = (token) => {
    Cookies.set('token', token);
}

export const doLogout = () => {
    Cookies.remove('token');
    Cookies.remove('eAdmin');
}

export const mudarTitulo = (titulo) => {
    document.title = titulo;
}