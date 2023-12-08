import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatienRecordModule } from './patien_record/patien_record.module';
import { ShareModule } from './share/share.module';

@Module({
  imports: [PatienRecordModule, ShareModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
