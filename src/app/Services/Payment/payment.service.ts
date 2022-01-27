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
      `https://localhost:44318/api/PaymentApi/CreateOrder/${'938742D3-F965-47A4-8E2B-697CF5310C87'}?Amount=${amount}`,
      {
        method: 'POST',
        redirect: 'follow',
      }
    );
  }

  OrderConfirmationId(PatientId: string, Amount: string) {
    var amount = Number(Amount);

    return fetch(
      `https://localhost:44318/api/PaymentApi/CreateOrder/${'938742D3-F965-47A4-8E2B-697CF5310C87'}?Amount=${amount}`,
      {
        method: 'POST',
        redirect: 'follow',
      }
    );
  }
}
