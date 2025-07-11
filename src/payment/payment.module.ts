import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecruteurSchema } from 'src/recruteur/entities/recruteur.entity';
import { PaymentSchema } from './entities/payment.entity';
@Module({
  imports: [MongooseModule.forFeature([{name:"payment",schema:PaymentSchema},{name:"utilisateur",schema: RecruteurSchema}])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}