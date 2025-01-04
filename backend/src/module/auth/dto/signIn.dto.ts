import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	password: string;

	@ApiProperty()
	@IsString()
	phoneNumber: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	firstName: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	lastName: string;

	@ApiProperty()
	@IsString()
	avatar: string;
}
