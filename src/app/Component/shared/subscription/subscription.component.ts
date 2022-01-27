import { Component, OnInit } from '@angular/core';
import {
  AdminUsersService,
  ICustomWindow,
} from 'src/app/Services/Admin/admin-users.service';
import { PaymentService } from 'src/app/Services/Payment/payment.service';

// C:\Working Project\CosmoWebApp\src\assets\Images\CosmosLogo.png
// import {} from 'src/assets/Images/CosmosLogo.png'

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent implements OnInit {
  rzp: any;
  //private _window?: ICustomWindow;
  private cachedImages = new Map<string, HTMLImageElement>();
  fullImagePath?: string;

  constructor(private auth: PaymentService) {
    // this.cachedImages.set('myImage', 'src/assets/Images/CosmosLogo.png');
    this.fullImagePath = 'src/assets/Images/CosmosLogo.png';
  }

  ngOnInit() {
    var Image = '../';
  }

  Test() {
    this.auth
      .GenerateOrderId('938742D3-F965-47A4-8E2B-697CF5310C87', '99')
      .then((response) => response.text())
      .then((result) => console.log(result[0]))
      .catch((error) => console.log('error', error));

    const options: any = {
      key: 'rzp_test_FksGPtneT1LOtK',
      amount: 9900, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: '', // company name or product name
      description: '', // product description
      image: this.fullImagePath, // company logo or product image
      order_id: 'order_IoefBUjeJuRJEK', // order_id created by you in backend
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9999999999',
      },
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a',
      },
    };

    options.handler = (response: any, error: any) => {
      options.response = response;
      var orderId = response.razorpay_order_id;
      var paymentId = response.razorpay_payment_id;
      var signature = response.razorpay_signature;
      // call your backend api to verify payment signature & capture transaction
    };
    options.modal.ondismiss = () => {
      // handle the case when user closes the form while transaction is in progress
      alert('Transaction cancelled.');
    };

    this.rzp = new this.auth.nativeWindow.Razorpay(options);
    this.rzp.open();
  }
}
