import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { LinkModule } from './link/link.module';

@Module({
  imports: [
    MongooseModule.forRoot( 'mongodb://localhost:27017/shortlink' ),

    LinkModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
