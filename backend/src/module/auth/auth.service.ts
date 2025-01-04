import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommonLogger } from '../../share/common/logger/common.logger';
import { SignInDto } from './dto/signIn.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { userError } from '../user/user.constant';
import * as bcrypt from 'bcrypt';
import { LogInDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/constant.config';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		@InjectRepository(User)
		private readonly userModel: Repository<User>,
	) {}

	public async signIn(signInDto: SignInDto): Promise<User> {
		try {
			const isUser = await this.userModel.findOne({ where: { email: signInDto.email } });
			if (isUser) throw new HttpException(userError.EMAIL_IS_EXISTS, HttpStatus.BAD_REQUEST);

			const hashPassword = await bcrypt.hash(signInDto.password, 12);
			const user: User = this.userModel.create({
				email: signInDto.email,
				password: hashPassword,
			});

			user.first_name = signInDto.firstName;
			user.last_name = signInDto.lastName;
			user.phone_number = signInDto.phoneNumber;
			user.avatar = signInDto.avatar;

			await this.userModel.save(user);
			return { ...user, password: undefined };
		} catch (error) {
			CommonLogger.log(`${new Date().toDateString()}_ERRORS_POST_AUTH_SIGNIN_SERVICE_`, error);
			throw error;
		}
	}

	public async login(logInDto: LogInDto): Promise<{ access_token: string; expired_at: number }> {
		try {
			const user = await this.userModel.findOne({ where: { email: logInDto.email } });
			if (!user) throw new HttpException(userError.USER_NOT_FOUND, HttpStatus.NOT_FOUND);

			const checkPassword = await bcrypt.compare(logInDto.password, user.password);
			if (!checkPassword) throw new HttpException(userError.WRONG_PASSWORD, HttpStatus.BAD_REQUEST);

			const payload: any = { user_id: user.id };
			const token = this.jwtService.sign(payload, { secret: jwtConfig.SECRET, expiresIn: jwtConfig.EXPIRES_IN });

			await this.userModel.update({ id: user.id }, { current_token: token });

			return {
				access_token: token,
				expired_at: 86400,
			};
		} catch (error) {
			CommonLogger.log(`${new Date().toDateString()}_ERRORS_POST_AUTH_LOGIN_WITH_EMAIL_SERVICE_`, error);
			throw error;
		}
	}

	public async signOut(userId: number): Promise<null> {
		try {
			await this.userModel.update({ id: userId }, { current_token: null });
			return null;
		} catch (error) {
			CommonLogger.log(`${new Date().toDateString()}_ERRORS_POST_AUTH_LOGOUT_SERVICE_`, error);
			throw error;
		}
	}

	public async refreshToken(userId: number): Promise<{ access_token: string; expired_at: number }> {
		const payload: any = { user_id: userId };
		const token = this.jwtService.sign(payload, { secret: jwtConfig.SECRET, expiresIn: jwtConfig.EXPIRES_IN });

		await this.userModel.update({ id: userId }, { current_token: token });

		return {
			access_token: token,
			expired_at: 86400,
		};
	}
}
