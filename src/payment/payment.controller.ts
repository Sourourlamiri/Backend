import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { join } from 'path';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post('create-checkout-session/:id')
  async createCheckoutSession(@Param('id') reservationId:string) {
    try {
      const session = await this.paymentService.createPayment();
      return { id: session.id };
    } catch (error) {
      console.error('Error in PaymentController:', error);
      throw new HttpException(
        'Failed to create payment session',
        error.status || 500,
      );
    }
  }




  @Get('success')
    success(@Res() res: any) {
      return res.sendFile(join(__dirname, '..', '..', 'public', 'success.html'));
    }
    @Get('cancel')
    cancel(@Res() res: any) {
      return res.sendFile(join(__dirname,  '..', '..', 'public', 'cancel.html'));
    }


  
}
