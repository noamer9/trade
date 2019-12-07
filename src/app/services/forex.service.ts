import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { apiKey, querySeriesUrl, querySharesQuote } from '../endpoints/endpoints';
import { Symbol } from '../models/symbole';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForexService {

  apikey: string;
    lastChart = null;
    private apiUrl = environment.apiUrl;
    constructor(private http:  HttpClient)
    {
      this.apikey = apiKey;
    }

    register(symbol: Symbol) {
      const url = 'symbols';
      const body = symbol;
      try {
        return this.ServerPost(url, body);
      } catch (error) {
        console.error(error);
      } finally {
      }
    }

    ServerPost(url: string, body: object | FormData, headers?: any): Observable<any> {
      if (headers) {
        return this.http.post<any>(this.apiUrl + '/' + url, body, { headers: headers })
      } else {
        return this.http.post<any>(this.apiUrl + '/' + url, body);
      }
    }

    getAllSymbols(){
      const url = 'symbols';
    try {
      return this.ServerGet(url);
    } catch (error) {
      console.error(error);
    } finally {
    }
    }


    ServerGet(url: string): Observable<any> {
      return this.http.get<any>(this.apiUrl + '/' + url);
    }

    createStockQuery(tickerSymbol)
    {
      // https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo
      const url = `${querySharesQuote}&symbol=${tickerSymbol}&apikey=${this.apikey}`;
      return url;

    };

    loadData(symbol)
    {
      return this.http.get(this.createStockQuery(symbol));
    }
    onDataReceived(symbol, callback, rawData )
    {
      console.log(" rew data ", rawData );


    };

}
