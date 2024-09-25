import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PurchaseModule } from './purchase/purchase.module';
import { SaleModule } from './sale/sale.module';
import { DispatchGuideModule } from './dispatch-guide/dispatch-guide.module';
import { CollectionModule } from './collection/collection.module';
import { ExpenseModule } from './expense/expense.module';
import { CustomerModule } from './customer/customer.module';
import { SupplierModule } from './supplier/supplier.module';
import { TransactionModule } from './transaction/transaction.module';
import { QuotationModule } from './quotation/quotation.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PurchaseModule,
    SaleModule,
    DispatchGuideModule,
    CollectionModule,
    ExpenseModule,
    CustomerModule,
    SupplierModule,
    TransactionModule,
    QuotationModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
