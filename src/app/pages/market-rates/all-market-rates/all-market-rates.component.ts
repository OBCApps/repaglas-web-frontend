import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralFunctions } from 'src/app/models/functions/alerts-function';
import { MarketRatesService } from '../market-rates.service';
import { LoadingService } from 'src/app/models/functions/loading/loadings/loading-service.service';

@Component({
  selector: 'app-all-market-rates',
  templateUrl: './all-market-rates.component.html',
  styleUrls: ['./all-market-rates.component.scss']
})
export class AllMarketRatesComponent extends GeneralFunctions{
  constructor(
    private router: Router,
    private marketRatesService: MarketRatesService,
    private loadingService: LoadingService,
    private route: ActivatedRoute


  ) {
    super()
  } 

  ngOnInit() {
    
    this.loadMarketRates()
  }
  Cotizaciones : any = []
  loadMarketRates () {
    this.loadingService.show();
    this.marketRatesService.getMarketRates().subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if(data.status_code == 200) {
          this.Cotizaciones = data.detail
        } else {
          this.error_function(data.detail)
        }
      } , err => {
        this.error_function("Error de traer data")
      }
    )
  }
  goToDetail(client : any){
    this.router.navigate(['home/all-market-detail', client.id] );    
  }
}
