import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'ogeoge',
    password: '12478',
    database: 'useroge',
    synchronize: true,
    autoLoadEntities: true
    }), 
ServeStaticModule.forRoot({
  rootPath: join(__dirname, '../../../..', 'users-demo-frontend','dist'),
}),],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
