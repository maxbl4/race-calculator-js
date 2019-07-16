import { Component, OnInit } from '@angular/core';
import {Rating, TrackService} from "../services/track.service";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-track-view',
  template: `
    <div class="row">
    <textarea class="form-control" 
      [(ngModel)]="rawCheckpoints"
              style="width:100%"
              (input)="processTrack()"
              rows="5">
      </textarea>
    </div>
    <div class="row">
      <table class="table table-sm table-striped">
        <thead>
          <tr><th colspan="3">Результаты</th></tr>
          <tr><th>Позиция</th><th>Номер участника</th><th>Кругов</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let rider of rating?.table">
            <td class="rider-position-{{rider.position}}">{{rider.position}}</td>
            <td class="rider-riderId-{{rider.position}}">{{rider.riderId}}</td>
            <td class="rider-laps-{{rider.position}}">{{rider.laps}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row">
      <table class="table table-sm table-striped">
        <thead>
        <tr><th colspan="1001">Дорожка кругов</th></tr>
          <tr><th>Круг</th><th colspan="1000">Дорожка</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let trackRow of rating?.trackByLap; let i = index">
            <td>{{i+1}}</td>
            <td *ngFor="let cp of trackRow">{{cp}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .rider-riderId-1, .rider-riderId-2, .rider-riderId-3 {
      font-weight: bold;
    }
  `]
})
export class TrackViewComponent implements OnInit {
  rating: Rating;
  _rawCheckpoints: string = "11 22 33 11 22 44 55 11";
  get rawCheckpoints(): string { return this._rawCheckpoints;}
  set rawCheckpoints(value: string) {
    this._rawCheckpoints = value;
  }
  constructor(private trackService: TrackService, private dataService: DataService) { }
  async ngOnInit() {
    const storedCheckpoints = await this.dataService.loadCheckpoints();
    if (storedCheckpoints)
      this._rawCheckpoints = storedCheckpoints;
    this.processTrack();
  }

  processTrack() {
    this.rating = this.trackService.process(this._rawCheckpoints);
    this.dataService.saveCheckpoints(this._rawCheckpoints);
  }
}
