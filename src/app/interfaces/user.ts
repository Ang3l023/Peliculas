export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    password?: string;
}

export class UsuarioModel {
    email: string;
    password: string;
    nombre: string;
}
