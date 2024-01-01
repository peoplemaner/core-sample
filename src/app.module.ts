import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'mysql',
          port: 3306,
          host: 'localhost',
          username: 'root',
          password: '12345678',
          database: 'core_test',
          autoLoadEntities: true,
          charset: 'utf8mb4',
          synchronize: true,
          logging: true,
          keepConnectionAlive: true,
          poolSize: 10,
        };
      },
    }),
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
