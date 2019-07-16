import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  rating: Rating;
  _rawCheckpoints: string = "11 22 33 11 22 44 55 11";
  get rawCheckpoints(): string { return this._rawCheckpoints;}
  set rawCheckpoints(value: string) {
    this._rawCheckpoints = value;
  }
  constructor() {
    const storedCheckpoints = localStorage.getItem("checkpoints");
    if (storedCheckpoints)
      this._rawCheckpoints = storedCheckpoints;
    this.processTrack();
  }
  processTrack() {
    this.rating = new TrackService().process(this._rawCheckpoints);
    localStorage.setItem("checkpoints", this._rawCheckpoints);
  }
}

class TrackService {
  process (trackStr: string) : Rating {
    const riderLaps = new Map<string, number>();
    const checkpoints = trackStr.match(/\w+/gi);
    const trackByLap = [];
    for (let cp of checkpoints) {
      const riderLapCount = (riderLaps.get(cp) || 0) + 1;
      riderLaps.set(cp, riderLapCount);
      if (riderLapCount > trackByLap.length)
        trackByLap.push([]);
      trackByLap[riderLapCount - 1].push(cp);
    }
    const visitedRiders = new Set<string>();
    const rating = new Rating();
    rating.trackByLap = trackByLap;
    let position = 1;
    for (let i = trackByLap.length - 1; i >= 0; i--) {
      const trackRow = trackByLap[i];
      for (let rider of trackRow) {
        if (!visitedRiders.has(rider)) {
          rating.table.push(new RiderRating(
            position++, rider, riderLaps.get(rider)
          ));
          visitedRiders.add(rider);
        }
      }
    }
    return rating;
  }
}

class Rating {
  trackByLap: string[][] = [];
  table: RiderRating[] = [];
}

class RiderRating {  
  constructor(
    public readonly position: number,
    public readonly riderId: string,
    public readonly laps: number
  ) {
  }
}