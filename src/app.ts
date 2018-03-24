import 'reflect-metadata'
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { BaseSubscriber } from './websocket/subscriber.base'
import { WebSocketService } from 'websocket/service';
import { WebSocketModule } from 'websocket';

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule)
	await app.listen(3000);
	BaseSubscriber.setWebsocket(app.select(WebSocketModule).get(WebSocketService).server);
}

bootstrap();