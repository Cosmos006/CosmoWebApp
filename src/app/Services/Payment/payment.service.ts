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
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    return fetch(
      `https://localhost:44318/api/PaymentApi/CreateOrder/${PatientId}?Amount=${amount}`,
      {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
      }
    );
  }

  OrderConfirmationId(PatientId: string, paymentId: string, orderId: string) {
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    return fetch(
      `https://localhost:44318/api/PaymentApi/Complete/${PatientId}?paymentId=${paymentId}&orderId=${orderId}`,
      {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
      }
    );
  }

  GetSubscribedData(PatientId: string) {
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    return fetch(
      `https://localhost:44318/api/PaymentApi/GetSubscribedData/${PatientId}`,
      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      }
    );
  }
}
