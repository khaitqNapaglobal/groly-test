import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfigMysql } from './config/typeorm.config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync(typeOrmAsyncConfigMysql),
		EventEmitterModule.forRoot(),
		UserModule,
		AuthModule,
	],
})
export class AppModule {}
