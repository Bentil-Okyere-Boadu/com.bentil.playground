export interface User {
    _id?: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    whatsappNumber: string,
    occupation: string,
    organization: string,
    dateOfBirth: string,
    residence: string,
    picture: string,
    hometown: string,
    password?: string,
} 

export interface LoginRes {_id: string, user: User, token: string}
