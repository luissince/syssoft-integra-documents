import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { SaleModule } from './modules/sale/sale.module';
import { DispatchGuideModule } from './modules/dispatch-guide/dispatch-guide.module';
import { CollectionModule } from './modules/collection/collection.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { QuotationModule } from './modules/quotation/quotation.module';
import { OrderModule } from './modules/order/order.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ProductModule } from './modules/product/product.module';
import { PersonModule } from './modules/person/person.module';
import { PurchaseOrderModule } from './modules/purchase-order/purchase-order.module';
import { PdfBrowserProvider } from './handlers/pdf-browser.provider';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PurchaseModule,
    PurchaseOrderModule,
    SaleModule,
    DispatchGuideModule,
    CollectionModule,
    ExpenseModule,
    TransactionModule,
    QuotationModule,
    OrderModule,
    ProductModule,
    PersonModule,
  ],
  controllers: [AppController],
  providers: [AppService, PdfBrowserProvider],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
