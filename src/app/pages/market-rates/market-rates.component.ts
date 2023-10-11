import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralFunctions } from 'src/app/models/functions/alerts-function';
import { LoadingService } from 'src/app/models/functions/loading/loadings/loading-service.service';
import { MarketRatesService } from './market-rates.service';

@Component({
  selector: 'app-market-rates',
  templateUrl: './market-rates.component.html',
  styleUrls: ['./market-rates.component.scss']
})
export class MarketRatesComponent extends GeneralFunctions{
  constructor(
    private router: Router,
    private marketRatesService: MarketRatesService,
    private loadingService: LoadingService,
    private route: ActivatedRoute


  ) {
    super()
  } 

  ngOnInit() {
    
    
  }
  
}
