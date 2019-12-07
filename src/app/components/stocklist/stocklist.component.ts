import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { StockSymbol } from "../../models/stocksymbol";
import { ShareSymbol } from "../../models/stocksymbol";
import { ForexService } from 'src/app/services/forex.service';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { Symbol } from '../../models/symbole';
import { NotificationService } from 'src/app/shared/notification';
import { SotrbyPipe } from '../../shared/sotrby.pipe';
@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.scss'],
  providers: [SotrbyPipe]
})
export class StocklistComponent implements OnInit {
  private shareSymbol: ShareSymbol;
  private i: number = 0;
  private interval;
  public form: FormGroup;
  private symbolRegex = /^[a-zA-Z]+$/;
  @Output() selectedStockSymbol = new EventEmitter<StockSymbol>();
  public isNegative: boolean = true;
  public stockNames = []
  public newSymbol: Symbol;
  private changeInterval: number = 5000;
  public symbols: StockSymbol[] = [];
  private tempSym: Symbol;

  constructor(private cdr: ChangeDetectorRef, private forex: ForexService
    , private notify: NotificationService, private sotrBy: SotrbyPipe) {

    this.form = new FormGroup({
      'symbol': new FormControl(null, [Validators.required,
      Validators.pattern(this.symbolRegex),
      Validators.minLength(1),]),
    });
  }


  ngOnInit() {
    this.getSymbols();
  }



  sort() {
    console.log("this.symbols ,", this.symbols);
    this.symbols = this.sotrBy.transform(this.symbols);
  }

  sortAbc() {
    this.symbols = this.sotrBy.transform(this.symbols, '1');
  }

  getSymbols() {
    this.forex.getAllSymbols()
      .subscribe((data: any) => {
        this.stockNames = data.data;
        console.log("this.stockNames , ", this.stockNames);
        if (this.stockNames.length > 0) {
          this.interval = setInterval(() => {
            this.loopNames();
          }, 5000);
        }
      })
  }

  loopNames() {
    let namesLen = this.stockNames.length;
    if (this.i === namesLen) {
      clearInterval(this.interval);
    } else {
      while (this.i < namesLen) {
        console.log("this i ", this.i);
        this.updateData(this.stockNames[this.i].symbol);
        this.i++;
        break;
      }
    }
  }

  register() {
    this.newSymbol = {
      symbol: this.form.value.symbol,
    };
    try {
      this.forex.register(this.newSymbol)
        .subscribe((symbol: Symbol) => {
          this.getSymbols();
          this.form.reset();
          this.notify.showSuccess('New Symbol was created', 'Notification');
        })

    } catch (error) {
      console.log(error);
      this.form.reset();
      for (var name in this.form.controls) {
        this.form.controls[name].setErrors(null);
      }
    }
  }



  updateData(symbole) {
    this.tempSym = symbole;
    console.log("sym ,", symbole);
    if (this.stockNames.length > 0) {
      this.forex.loadData(symbole)
        .subscribe(async (data: any) => {
          if (data['Global Quote']) {
            const updatedData = await data['Global Quote'];
            if (updatedData != undefined || updatedData != null || updatedData != '' || updatedData != "undefined") {
              console.log("updatedData , ", updatedData);
              this.setUpdateData(updatedData);
            } else {
            }
          }
        })
    }
  }



  setUpdateData(updatedData) {
    this.shareSymbol = {
      title: updatedData["01. symbol"],
      preClosePrice: updatedData["08. previous close"],
      currPrice: updatedData["05. price"],
      change: updatedData["09. change"]
    };
    console.log("symObj ,", this.shareSymbol);
    this.symbols.push(this.shareSymbol);
    console.log("syms ,", this.symbols);
  }

  ngAfterViewInit() {
    this.cdr.detach();

    if (this.changeInterval > 0) {
      setInterval(() => {
        this.update();

      }, this.changeInterval);
    }
  }


  update() {
    this.cdr.detectChanges();
  }

  onStockSymbolSelected(symbol: StockSymbol) {
    console.log("symbole ", symbol);
    this.selectedStockSymbol.emit(symbol);
  }


}
