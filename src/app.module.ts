import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'danni',
      password: '@dmin23',
      database: 'nestauthdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
