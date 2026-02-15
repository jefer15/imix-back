import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async process(content: string): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (content.toLowerCase().includes('error')) {
          return reject(new Error('AI_PROCESSING_ERROR'));
        }
        resolve(`IA procesó el texto: ${content.toUpperCase()}`);
      }, 1500);
    });
  }
}