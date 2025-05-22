import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPayement } from './interface/interface-payment';
import Stripe from 'stripe';
@Injectable()
export class PaymentService {
  private stripe:Stripe;
  constructor(@InjectModel('payment') private payementModel:Model<IPayement>) {
    this.stripe=new Stripe("sk_test_51RFBIUGh10iY8VXbawyDd7Lkkp9gwsMWHbOkdWzlxtS69RqmIJhuv3DPB3aYEvM8HDEITfwwI0tT4Mu8R8LePYMh00kHjaRRJf",{
      apiVersion:"2020-08-27"as any,
    })
  }
  async createPayment():Promise<any>{
    try {
      const session=await this.stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items:[
          {
            price_data:{
              currency:'usd',
              product_data:{
                name:'Product simple'
              },
              unit_amount:2000,
            },
            quantity:1
          }
        ],
        mode: 'payment',
        success_url: 'http://localhost:5002/payment/success',
        cancel_url: 'http://localhost:5002/payment/cancel',
      })
      return session;
    } catch (error) {
      console.error('Error creating checkout session:', error);
        throw new HttpException(
          'Unable to create checkout session',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
   }
}











