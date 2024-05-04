import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './lib/AllExceptionFilter';
import { join } from 'path';
import { config } from './common/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: join(__dirname, 'protos/user.proto'),
        url: config.serverPort,
      },
    },
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen();
}
bootstrap();
