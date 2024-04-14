import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { CALCULATE_QUEUE } from './constance';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

@Processor(CALCULATE_QUEUE)
export class CalculateConsumer extends WorkerHost {
  private readonly logger = new Logger(CalculateConsumer.name);

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Calculating message: ${job.id}`);
    const { num1, num2 } = job.data;
    const result = num1 + num2;
    await new Promise((resolve) => setTimeout(resolve, 5000));
    this.logger.log(`Result: ${result}`);
    this.logger.log("Calculating completed for job: " + job.id);
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    // do some stuff
  }
}
