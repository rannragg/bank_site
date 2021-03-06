import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service'
import { ResultObject } from '../models/result-object'

@Component({
  selector: 'app-add-exchange',
  templateUrl: './add-exchange.component.html',
  styleUrls: ['./add-exchange.component.css']
})
export class AddExchangeComponent implements OnInit {

  currencyPair = '';
  ratio = 0.0;
  pairsOptions = null;
  selectedPair = null;
  allExchanges = null;

  message = '';
  successMessage = '';

  constructor(private util: UtilService) { }

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    let res : ResultObject = this.util.exchangeGetAll();
    if(res.success){
      this.allExchanges = res.resObj;
    }
    else{
      this.successMessage = '';
      this.message = 'there was error loading exchanges'
      this.allExchanges = null;
    }

  }

  addExchange(fromId, toId , ratio) {
    //let qs = '?currencyName=' + this.currencyName + '&ratioToDollar=' + this.ratioToDollar;
    let res: ResultObject = this.util.exchangeAdd(fromId,toId,ratio);
    if (res && res.success !== false) {
      this.message = '';
      this.successMessage = 'new currency has been added successfully';
    }
    else {
      this.successMessage = '';
      this.message = 'there was error in adding new currency';
      // roll back request to server
    }
    this.loadComponent();
  }

}
