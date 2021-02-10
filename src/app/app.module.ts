import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {DemoMaterialModule} from './material-module';
import {HttpClientModule} from '@angular/common/http';
import {LineChartComponent} from './line-chart/line-chart.component';
import {HighchartsChartModule} from 'highcharts-angular';
import {TradingViewsModule} from './trading-views/tradingviews.module';

@NgModule({
    declarations: [
        AppComponent,
        LineChartComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        DemoMaterialModule,
        HttpClientModule,
        HighchartsChartModule,
        TradingViewsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
