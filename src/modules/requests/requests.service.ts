import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request, RequestDocument } from './schemas/request.schema';
import { CreateRequestDto } from './dto/create-request.dto';
import { AiService } from './ai.service';
import { RequestStatus } from './enums/requestStatus.enum';

@Injectable()
export class RequestsService {
  private readonly logger = new Logger(RequestsService.name);
  constructor(
    @InjectModel(Request.name)
    private requestModel: Model<RequestDocument>,
    private aiService: AiService,
  ) { }

  async create(createDto: CreateRequestDto) {
    let newRequest: RequestDocument | null = null;

    try {
      newRequest = await this.requestModel.create({
        content: createDto.content,
        status: RequestStatus.PROCESSING,
      });

      const aiResult = await this.aiService.process(createDto.content);

      newRequest.status = RequestStatus.COMPLETED;
      newRequest.result = aiResult;
      await newRequest.save();

      return newRequest;

    } catch (error) {
      this.logger.error('Error processing request', error.stack);
      if (newRequest) {
        newRequest.status = RequestStatus.FAILED;
        await newRequest.save();
        return newRequest;
      }
      throw new InternalServerErrorException('Error processing request');
    }
  }
}