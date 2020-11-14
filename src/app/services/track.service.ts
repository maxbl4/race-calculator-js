import { Injectable } from "@angular/core";
@Injectable()
export class TrackService {
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

export class Rating {
  trackByLap: string[][] = [];
  table: RiderRating[] = [];
}

export class RiderRating {
  constructor(
    public readonly position: number,
    public readonly riderId: string,
    public readonly laps: number
  ) {
  }
}
