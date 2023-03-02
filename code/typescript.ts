export interface User{
    name:string;
    age?:number;
    sex:number;
}

export type JU = Partial<User>