import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import * as LightweightCharts from 'lightweight-charts';
import {TradingService} from '../trading.service';

interface Time {
    year: number;
    month: number;
    day: number;
}

@Component({
    selector: 'app-chart1',
    templateUrl: './chart1.component.html'
})
export class Chart1Component implements AfterViewInit, OnInit {

    @ViewChild('chart') chartRef: any;

    private candleSeries: any;
    private data: Array<any> = [];
    private candleStick: any;
    private currentBar: any;
    private ticksInCurrentBar = 0;
    private currentBusinessDay = { day: 29, month: 5, year: 2019 };

    constructor(private dataService: TradingService) {
        this.currentBar = {
            open: null,
            high: null,
            low: null,
            close: null,
            time: this.currentBusinessDay,
        };
    }

    ngAfterViewInit(): void {
        const chart = LightweightCharts.createChart(this.chartRef.nativeElement, {
            width: 600,
            height: 300,
            crosshair: {
                mode: LightweightCharts.CrosshairMode.Normal,
            },
        });

        this.candleSeries = chart.addCandlestickSeries();
        chart.timeScale().fitContent();
    }

    mergeTickToBar(candleStick: any): void {
        if (this.currentBar.open === null) {
            this.currentBar.open = candleStick.close;
            this.currentBar.high = candleStick.close;
            this.currentBar.low = candleStick.close;
            this.currentBar.close = candleStick.close;
        } else {
            this.currentBar.close = candleStick.close;
            this.currentBar.high = candleStick.high;
            this.currentBar.low = candleStick.low;
        }
        this.candleSeries.update(this.currentBar);
    }

    nextBusinessDay(time: any): Time {
        const d = new Date();
        d.setUTCFullYear(time.year);
        d.setUTCMonth(time.month - 1);
        d.setUTCDate(time.day + 1);
        d.setUTCHours(0, 0, 0, 0);
        return {
            year: d.getUTCFullYear(),
            month: d.getUTCMonth() + 1,
            day: d.getUTCDate(),
        };
    }

    ngOnInit(): void {
        this.dataService.messages1$.subscribe(data => {
            if (typeof data === 'string') {
                this.candleStick = JSON.parse(data);
            } else {
                return;
            }
            console.log(this.candleStick);
            this.mergeTickToBar(this.candleStick);
            if (++this.ticksInCurrentBar === 60) {
                // move to next bar
                this.currentBusinessDay = this.nextBusinessDay(this.currentBusinessDay);
                this.currentBar = {
                    open: null,
                    high: null,
                    low: null,
                    close: null,
                    time: this.currentBusinessDay,
                };
                this.ticksInCurrentBar = 0;
            }
        });
    }
}
