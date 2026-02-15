import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RequestStatus } from '../enums/requestStatus.enum';

export type RequestDocument = Request & Document;

@Schema({ timestamps: true })
export class Request {
  @Prop({ required: true })
  content: string;

  @Prop({ default: RequestStatus.PENDING })
  status: RequestStatus;

  @Prop()
  result: string;
}

export const RequestSchema = SchemaFactory.createForClass(Request);

