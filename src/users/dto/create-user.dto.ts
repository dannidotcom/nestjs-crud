import { IsString, IsEmail } from "class-validator";

export class CreateUserDto {

    @IsString()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    
    password: string;
    @IsString()
    role: string;

}
