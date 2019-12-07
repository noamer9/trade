export class StockSymbol
{
  id?: string;
  title: string;
  preClosePrice: number;
  currPrice: number;
  change: number;

  constructor(id: string, title: string, preClosePrice: number, currPrice: number, change: number)
  {
    this.id = id;
    this.title = title;
    this.preClosePrice = preClosePrice;
    this.currPrice = currPrice;
    this.change = change;
  }
}

export interface ShareSymbol {
  title: string;
  preClosePrice: number;
  currPrice: number;
  change: number;
}
