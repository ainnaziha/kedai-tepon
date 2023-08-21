import { Injectable } from '@angular/core';
import Commerce from '@chec/commerce.js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommerceService {
  public commerce: Commerce;

  constructor(
  ) {
    this.commerce = new Commerce(environment.commerceApiKey, true);
  }
}
