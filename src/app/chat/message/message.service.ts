import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/chat';
import { MessageRepository } from 'src/repositories/chat';
import { BaseService } from 'src/common/base';

@Injectable()
export class MessageService extends BaseService {
   constructor(@InjectRepository(MessageEntity) private messageRepository: MessageRepository) {
      super();
   }
   async create(createMessageDto: CreateMessageDto) {
      try {
         return await this.messageRepository.save(createMessageDto);
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async findByRoomName(room_name: string) {
      try {
         return await this.messageRepository.find({
            where: {
               room: {
                  room_name: room_name,
               },
            },
         });
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
