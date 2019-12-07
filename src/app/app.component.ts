import { Component, ViewChild } from '@angular/core';
import { StockbodyComponent } from './components/stockbody/stockbody.component';
import { StockSymbol } from "./models/stocksymbol";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'trade-app';
  @ViewChild(StockbodyComponent) stockbody: StockbodyComponent;

  symbolSelectedFromList(symbol: StockSymbol)
  {
  	this.stockbody.createChart(symbol.title);
  }
}
