import { Component } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';

@Component({
  selector: 'app-overnight-dashboard',
  templateUrl: './overnight-dashboard.component.html',
  styleUrls: ['./overnight-dashboard.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class OvernightDashboardComponent {
  private hoursOf(night: any): number {
    return (night.sleepEnd.getTime() - night.sleepStart.getTime()) / (1000 * 60 * 60);
  }

  private format(hours: number): string {
    const totalMinutes = Math.round(hours * 60);
    return Math.floor(totalMinutes / 60) + 'h ' + (totalMinutes % 60) + 'm';
  }

  get nights() {
    return SleepService.AllOvernightData.slice().sort(
      (a, b) => a.sleepStart.getTime() - b.sleepStart.getTime()
    );
  }

  get longest(): string {
    return this.format(Math.max(...this.nights.map(n => this.hoursOf(n))));
  }

  get shortest(): string {
    return this.format(Math.min(...this.nights.map(n => this.hoursOf(n))));
  }

  get average(): string {
    const total = this.nights.reduce((sum, n) => sum + this.hoursOf(n), 0);
    return this.format(total / this.nights.length);
  }
} 