import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import * as LightweightCharts from 'lightweight-charts';
import {TradingService} from '../trading.service';

@Component({
    selector: 'app-chart2',
    templateUrl: './chart2.component.html',
    styleUrls: ['./chart2.component.scss']
})
export class Chart2Component implements AfterViewInit, OnInit {
    @ViewChild('chart') chartRef: any;

    private areaSeries: any;
    private lineSeries: any;
    private price: any;

    constructor(private dataService: TradingService) {
    }

    ngAfterViewInit(): void {
        const chart = LightweightCharts.createChart(this.chartRef.nativeElement, {
            width: 600,
            height: 300,
            rightPriceScale: {
                scaleMargins: {
                    top: 0.2,
                    bottom: 0.1,
                },
            },
            leftPriceScale: {
                visible: true,
                borderColor: 'rgba(197, 203, 206, 1'
            },
            crosshair: {
                mode: LightweightCharts.CrosshairMode.Normal,
            },
            timeScale: {
                borderColor: 'rgba(197, 203, 206, 1)',
            },
            handleScroll: {
                vertTouchDrag: false,
            },
        });
        chart.timeScale().fitContent();

        this.areaSeries = chart.addAreaSeries({
            topColor: 'rgba(245, 124, 0, 0.4)',
            bottomColor: 'rgba(245, 124, 0, 0.1)',
            lineColor: 'rgba(245, 124, 0, 1)',
            lineWidth: 2,
            priceScaleId: 'left'
        });

        this.areaSeries.setData([]);
        this.lineSeries = chart.addLineSeries({
            color: 'rgba(4, 111, 232, 1)',
            lineWidth: 2,
        });
        this.lineSeries.setData([]);
    }

    ngOnInit(): void {
        this.dataService.messages2$.subscribe(data => {
            console.log(data);
            // if (typeof data === 'string') {
            //     this.price = JSON.parse(data);
            // } else {
            //     return;
            // }
            const now = new Date();
            this.price = data;
            if (this.price.litecoin) {
                this.areaSeries.update({
                    time: now.getTime(),
                    value: Number(this.price.litecoin)
                });
            }
            if (this.price.monero) {
                this.lineSeries.update({
                    time: now.getTime(),
                    value: Number(this.price.monero)
                });
            }
            // console.log(this.price);
            // this.areaSeries.update({
            //     time: now.getTime(),
            //     value: this.price.litecoin
            // });
            // this.lineSeries.update({
            //     time: now.getTime(),
            //     value: this.price.monero
            // });
        });
    }
}
