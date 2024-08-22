export interface ILoginRequestBody {
    username: string;
    password: string;
}

export interface ILoginResponseBody {
    access_token: string;
    username: string;
}