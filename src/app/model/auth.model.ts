export interface AuthModel{
    message: string
    jwt_token: string 
    api_auth_user : {email: string, id: number, full_name: string}
}