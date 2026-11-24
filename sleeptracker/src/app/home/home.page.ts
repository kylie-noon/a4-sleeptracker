import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonLabel, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonLabel, IonSegment, IonSegmentButton, FormsModule, RouterLink],
})
export class HomePage {
	chosenView: string = 'all'; // shown category of data

	constructor(public sleepService: SleepService) {

	}

	ngOnInit() {
		console.log(this.displayedData);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	// list shown on page
	get displayedData(): SleepData[] {
		if (this.chosenView === 'overnight') {
			return SleepService.AllOvernightData;
		}
		if (this.chosenView === 'sleepiness') {
			return SleepService.AllSleepinessData;
		}
		return SleepService.AllSleepData;
	}
}
