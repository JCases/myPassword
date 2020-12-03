import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(cosumer: MiddlewareConsumer) {
    cosumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
