import { Module } from '@nestjs/common';

// import { MiddlewareConsumer } from '@nestjs/common';
// import { DelayMiddleware } from './http/middlewares/delay';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(DelayMiddleware).forRoutes('*');
  // }
}
