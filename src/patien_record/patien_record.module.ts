import { Module } from '@nestjs/common';
import { PatienRecordService } from './services/patien_record.service';
import { PatienRecordController } from './controller/patien_record.controller';
import { ShareModule } from 'src/share/share.module';
import { PatienRecordTodoService } from './services/patien_record.todo.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressService } from './services/address.service';
import { AddressTodoService } from './services/address.todo.service';

@Module({
  imports: [ShareModule],
  providers: [
    PatienRecordService,
    PatienRecordTodoService,
    PrismaService,
    AddressService,
    AddressTodoService,
  ],
  controllers: [PatienRecordController],
})
export class PatienRecordModule {}
