import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { StockSymbol } from "../../../models/stocksymbol";
import { SotrbyPipe } from '../../../shared/sotrby.pipe';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss'],
  providers: [ SotrbyPipe ]
})
export class StockItemComponent implements OnInit {
  @Input() isNegative: boolean;
  @Input() symbol: StockSymbol;
  @Output() symbolSelected = new EventEmitter<StockSymbol>();
  @Output() updateData = new EventEmitter<string>();
  constructor(  private sotrBy: SotrbyPipe ) { }

  ngOnInit() { }
  onSelected()
  {
    this.symbolSelected.emit(this.symbol);
    console.log("this.symbol ,", this.symbol );
  }

  // onUpdateData(symbol){
  //   console.log("symbol , ", symbol );
  //   this.updateData.emit(symbol);
  // }

//
}
