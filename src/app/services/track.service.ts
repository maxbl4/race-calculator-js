import { Injectable } from "@angular/core";

@Injectable()
export class TrackService {
  process (trackStr: string) : Rating {
    const riderLaps = new Map<string, number>();
    const checkpoints = trackStr.match(/\S+/gi);
    const directives = Directives.parse(checkpoints);
    const trackByLap = [];
    for (let t of checkpoints.filter(x => !x.startsWith("#"))) {
      let cp: string;
      if (directives.teamSize) {
        cp = Math.ceil(parseInt(t) / directives.teamSize).toString();
      }else {
        cp = t;
      }
      const riderLapCount = (riderLaps.get(cp) || 0) + 1;
      riderLaps.set(cp, riderLapCount);
      if (riderLapCount > trackByLap.length)
        trackByLap.push([]);
      trackByLap[riderLapCount - 1].push(cp);
    }
    const visitedRiders = new Set<string>();
    const rating = new Rating();
    rating.trackByLap = trackByLap;
    rating.directives = directives;
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

namespace Directives {
  export const teamSize = "teamSize";
  export const All = [teamSize];

  export interface Object {
    teamSize?: number;
  }

  export function parse(tokens: RegExpMatchArray): Object {
    const result: Object = {};
    for (let token of tokens) {
      if (token.startsWith("#")) {
        const kv = token.substring(1).split("=");
        if (kv.length === 2)
        {
          const directiveKey = All.find(x => x.toLowerCase() === kv[0].toLowerCase());
          if (directiveKey)
            result[directiveKey] = kv[1];
        }
      }
    }
    return result;
  }
}

export class Rating {
  trackByLap: string[][] = [];
  table: RiderRating[] = [];
  directives: Directives.Object;
}

export class RiderRating {
  constructor(
    public readonly position: number,
    public readonly riderId: string,
    public readonly laps: number
  ) {
  }
}
