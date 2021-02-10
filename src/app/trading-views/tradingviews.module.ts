import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Chart1Component} from './chart1/chart1.component';
import {Chart2Component} from './chart2/chart2.component';


@NgModule({
    declarations: [Chart1Component, Chart2Component],
    exports: [
        Chart1Component,
        Chart2Component
    ],
    imports: [
        CommonModule
    ]
})
export class TradingViewsModule {
}
