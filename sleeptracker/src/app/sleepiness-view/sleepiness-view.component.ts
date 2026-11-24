import { Component } from '@angular/core';
import { IonCard, IonCardContent } from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-sleepiness-view',
  templateUrl: './sleepiness-view.component.html',
  styleUrls: ['./sleepiness-view.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardContent]
})
export class SleepinessViewComponent {
  descriptions = StanfordSleepinessData.ScaleValues;

  // 'morning', 'afternoon' or 'night' for a time
  partOfDay(date: Date): string {
    const hour = date.getHours();
    if (hour < 12) {
      return 'morning';
    }
    if (hour < 18) {
      return 'afternoon';
    }
    return 'night';
  }

  // newest entries first
  get sortedEntries() {
    return SleepService.AllSleepinessData.slice().sort(
      (a, b) => b.loggedAt.getTime() - a.loggedAt.getTime()
    );
  }
}