import { Injectable } from '@angular/core';
import Commerce from '@chec/commerce.js';

@Injectable({
  providedIn: 'root'
})
export class CommerceService {

  public commerce: Commerce;

  constructor() {
    this.commerce = new Commerce('pk_test_537353a87d16b50e31fcc40be09492969601d2caa8135', true);
  }
}

