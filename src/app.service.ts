import { Injectable } from '@nestjs/common';
import { CALCULATE_QUEUE } from './constance';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AppService {
  constructor(@InjectQueue(CALCULATE_QUEUE) private calculateQueue: Queue){}

  getHello(): string {
    return 'Hello World!!';
  }

  async calculate(data: { num1: number; num2: number }) {
    this.calculateQueue.add('calculate', data);
  }
}
