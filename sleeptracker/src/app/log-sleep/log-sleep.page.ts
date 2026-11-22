import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonInput, IonButton, IonText } from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';

@Component({
  selector: 'app-log-sleep',
  templateUrl: './log-sleep.page.html',
  styleUrls: ['./log-sleep.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonInput, IonButton, IonText, CommonModule, FormsModule]
})
export class LogSleepPage {
  bedTime: string = '';
  wakeTime: string = '';

  constructor(private sleepService: SleepService, private router: Router) { }

  get errorMessage(): string {
    if (this.bedTime === '' || this.wakeTime === '') {
      return '';
    }
    if (new Date(this.wakeTime) <= new Date(this.bedTime)) {
      return 'Wake time must be after bedtime.';
    }
    return '';
  }

  get canSave(): boolean {
    return this.bedTime !== '' && this.wakeTime !== '' && this.errorMessage === '';
  }

  save() {
    console.log('save clicked', this.bedTime, this.wakeTime);
    const sleep = new OvernightSleepData(new Date(this.bedTime), new Date(this.wakeTime));
    this.sleepService.logOvernightData(sleep);
    this.router.navigateByUrl('/home');
  }
}
