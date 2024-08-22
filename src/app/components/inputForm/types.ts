import { ChangeEvent } from "react";

export interface PropsType {
    changeInputUsername: (input: ChangeEvent<HTMLInputElement>) => void;
    changeInputPassword: (input: ChangeEvent<HTMLInputElement>) => void;
    username: string;
    password: string;
}