import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  public barChartLabels = ['Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre'];
  public barChartType = 'bar';
  public barChartLegend = true;

  // Datos ficticios de ventas para los últimos 5 meses
  public barChartData = [
    { data: this.generateRandomData(), label: 'Ventas' },
  ];

  private generateRandomData() {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 100) + 1);
  }

  type_solicitud: string = "sales";
  changeTypeSolicitud(value: any) {
    this.type_solicitud = value;
  }


  // RANKING VENTAS
  partSales = [
    { partName: 'Motor', sales: 80 },
    { partName: 'Frenos', sales: 65 },
    { partName: 'Batería', sales: 45 },
    { partName: 'Llantas', sales: 60 },
    { partName: 'Aceite', sales: 75 },
  ];

  public quotes = [
    {
      id: 1,
      customerName: 'Cliente A',
      items: [
        { id: 1, itemName: 'Motor', description: 'Motor de alta potencia', price: 2000 },
        { id: 2, itemName: 'Frenos', description: 'Sistema de frenado avanzado', price: 800 },
      ],
      total: 2800,
    },
    {
      id: 2,
      customerName: 'Cliente B',
      items: [
        { id: 3, itemName: 'Llantas', description: 'Llantas para todo terreno', price: 1200 },
        { id: 4, itemName: 'Aceite', description: 'Aceite sintético de alto rendimiento', price: 150 },
      ],
      total: 1350,
    },
  ];
}
