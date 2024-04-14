import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bullmq';
import { CALCULATE_QUEUE } from './constance';
import { CalculateConsumer } from './calculate.consumer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT')
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: CALCULATE_QUEUE,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CalculateConsumer],
})
export class AppModule {}
