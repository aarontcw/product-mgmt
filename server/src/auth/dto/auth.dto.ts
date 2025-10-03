import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';
export class RegisterDto {
  @IsEmail() email!: string;
  @IsString() password!: string; // keep simple for interview demo
  @IsOptional() @IsIn(['ADMIN','CUSTOMER']) role?: 'ADMIN'|'CUSTOMER';
}
export class LoginDto {
  @IsEmail() email!: string;
  @IsString() password!: string;
}