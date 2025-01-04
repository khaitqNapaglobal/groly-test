import { Body, Controller, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login.dto';
import { JwtAuthGuard } from '../../share/guard/jwt.guard';
import { auth_constant } from './auth.constant';
import { SignInDto } from './dto/signIn.dto';
import { GetUser } from 'src/share/decorator';

@ApiTags('Auth')
@Controller(auth_constant.BASE_PATH)
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('sign-in')
	async signIn(@Body() signInDto: SignInDto) {
		return await this.authService.signIn(signInDto);
	}

	@Post('login')
	async logIn(@Body() logInDto: LogInDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const { access_token, expired_at } = await this.authService.login(logInDto);
		res.cookie('access_token', access_token);
		return { access_token, expired_at };
	}

	@Put('sign-out')
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	async signOut(@GetUser() user) {
		return await this.authService.signOut(user.id);
	}

	@Put('refresh-token')
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	async refreshToken(@GetUser() user, @Res({ passthrough: true }) res: Response) {
		const { access_token, expired_at } = await this.authService.refreshToken(user.id);
		res.cookie('access_token', access_token);
		return { access_token, expired_at };
	}
}
