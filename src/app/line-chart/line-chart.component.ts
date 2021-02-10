import {Component, OnInit, OnDestroy} from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import {DataService} from './data.service';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnDestroy {
    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: Highcharts.Options;
    data: Array<any> = [];
    private id = 0;
    private dataService: DataService;

    constructor(dataService: DataService) {
        this.dataService = dataService;
        this.chartOptions = {
            series: [
                {
                    type: 'line',
                    data: this.data
                }
            ]
        };
    }

    ngOnInit(): void {
        this.id = setInterval(() => {
            this.data.push(this.dataService.getData());
            console.log(this.data);
        }, 1000);
    }

    ngOnDestroy(): void {
        if (this.id) {
            clearInterval(this.id);
        }
    }
}
