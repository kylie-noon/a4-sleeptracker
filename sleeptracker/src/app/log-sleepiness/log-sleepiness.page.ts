import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonInput, IonButton, IonText, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-log-sleepiness',
  templateUrl: './log-sleepiness.page.html',
  styleUrls: ['./log-sleepiness.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonInput, IonButton, IonText, IonSelect, IonSelectOption, CommonModule, FormsModule]
})
export class LogSleepinessPage implements OnInit {
  ratings: number[] = [1, 2, 3, 4, 5, 6, 7];
  descriptions = StanfordSleepinessData.ScaleValues;
  chosenRating: number | null = null;
  when: string = '';

  constructor(private sleepService: SleepService, private router: Router) {}

  ngOnInit() {
     const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    this.when = now.toISOString().slice(0, 16);
  }

  get errorMessage(): string {
    if (this.when !== '' && new Date(this.when) > new Date()) {
      return 'Logging a time in the future is not allowed';
    }
    return '';
  }

  get canSave(): boolean {
    return this.chosenRating !== null && this.when !== '' && this.errorMessage === '';
  }

  save() {
    const entry = new StanfordSleepinessData(Number(this.chosenRating), new Date(this.when));
    this.sleepService.logSleepinessData(entry);
    this.router.navigateByUrl('/home');
  }
}
