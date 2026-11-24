import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonSegment, IonSegmentButton, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { OvernightDashboardComponent } from '../overnight-dashboard/overnight-dashboard.component';
import { SleepinessViewComponent } from '../sleepiness-view/sleepiness-view.component';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonSegment, IonSegmentButton, IonCard, IonCardHeader, IonCardTitle, FormsModule, RouterLink, OvernightDashboardComponent, SleepinessViewComponent],
})
export class HomePage {
	chosenView: string = 'all'; // which view is shown
}

// import { Component } from '@angular/core';
// import { RouterLink } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonLabel, IonSegment, IonSegmentButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
// import { SleepService } from '../services/sleep.service';
// import { SleepData } from '../data/sleep-data';
// import { OvernightSleepData } from '../data/overnight-sleep-data';

// @Component({
// 	selector: 'app-home',
// 	templateUrl: 'home.page.html',
// 	styleUrls: ['home.page.scss'],
// 	imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonLabel, IonSegment, IonSegmentButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, FormsModule, RouterLink],
// })
// export class HomePage {
// 	chosenView: string = 'all'; // shown category of data

// 	constructor(public sleepService: SleepService) {

// 	}

// 	ngOnInit() {
// 		console.log(this.displayedData);
// 	}

// 	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
// 	get allSleepData() {
// 		return SleepService.AllSleepData;
// 	}

// 	// list shown on page
// 	get displayedData(): SleepData[] {
// 		if (this.chosenView === 'overnight') {
// 			return SleepService.AllOvernightData;
// 		}
// 		if (this.chosenView === 'sleepiness') {
// 			return SleepService.AllSleepinessData;
// 		}
// 		return SleepService.AllSleepData;
// 	}

// 	isOvernight(item: SleepData): boolean {
// 		return item instanceof OvernightSleepData;
// 	}
// }
