
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HighchartsChartComponent } from 'highcharts-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './shared/http-interceptor';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RoutingModule } from './shared/routing.module';
import { MaterialModule } from './shared/material/material.module';
import { StocklistComponent } from './components/stocklist/stocklist.component';
import { StockbodyComponent } from './components/stockbody/stockbody.component';
import { HeaderComponent } from './components/header/header.component';
import { StockItemComponent } from './components/stocklist/stock-item/stock-item.component';
import { ForexComponent } from './components/forex/forex.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StocklistComponent,
    StockbodyComponent,
    HighchartsChartComponent,
    StockItemComponent,
    ForexComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
