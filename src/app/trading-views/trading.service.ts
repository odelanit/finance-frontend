import {Injectable} from '@angular/core';
import {webSocket} from 'rxjs/webSocket';
import {concatMap, delay} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TradingService {
    private subject1 = webSocket('ws://localhost:8000/ws/ohlc');
    private subject2 = webSocket('wss://ws.coincap.io/prices?assets=monero,litecoin');
    public messages1$ = this.subject1.pipe(concatMap(item => of(item).pipe(delay(1000))));
    public messages2$ = this.subject2.pipe(concatMap(item => of(item).pipe(delay(200))));
}
