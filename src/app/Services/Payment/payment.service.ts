import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

function _window(): any {
  return window;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  get nativeWindow(): any {
    return _window();
  }

  GenerateOrderId(PatientId: string, Amount: string) {
    var amount = Number(Amount);

    return fetch(
      `https://localhost:44318/api/PaymentApi/CreateOrder/${PatientId}?Amount=${amount}`,
      {
        method: 'POST',
        redirect: 'follow',
      }
    );
  }

  OrderConfirmationId(PatientId: string, paymentId: string, orderId: string) {
    return fetch(
      `https://localhost:44318/api/PaymentApi/Complete/${PatientId}?paymentId=${paymentId}&orderId=${orderId}`,
      {
        method: 'POST',
        redirect: 'follow',
      }
    );
  }
}
