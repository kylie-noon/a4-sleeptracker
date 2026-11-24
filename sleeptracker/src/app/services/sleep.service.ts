import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Injectable({
	providedIn: 'root'
})
export class SleepService {
	public static AllSleepData: SleepData[] = [];
	public static AllOvernightData: OvernightSleepData[] = [];
	public static AllSleepinessData: StanfordSleepinessData[] = [];

	constructor() {
		this.loadData();
	}

	// reads saved text to rebuild objects
	private async loadData() {
		const result = await Preferences.get({ key: 'sleepData' });
		if (!result.value) {
			return;
		}
		const saved = JSON.parse(result.value);
		for (const item of saved) {
			if (item.type === 'overnight') {
				const entry = new OvernightSleepData(new Date(item.sleepStart), new Date(item.sleepEnd));
				entry.id = item.id;
				entry.loggedAt = new Date(item.loggedAt);
				SleepService.AllSleepData.push(entry);
				SleepService.AllOvernightData.push(entry);
			} else {
				const entry = new StanfordSleepinessData(item.loggedValue, new Date(item.loggedAt));
				entry.id = item.id;
				SleepService.AllSleepData.push(entry);
				SleepService.AllSleepinessData.push(entry);
			}
		}
	}

	// entry turns to plain data and gets saved as text
	private async saveData() {
		const plain = SleepService.AllSleepData.map(item => {
			if (item instanceof OvernightSleepData) {
				return { type: 'overnight', id: item.id, loggedAt: item.loggedAt, sleepStart: item.sleepStart, sleepEnd: item.sleepEnd };
			}
			const s = item as StanfordSleepinessData;
			return { type: 'sleepiness', id: s.id, loggedAt: s.loggedAt, loggedValue: s.loggedValue };
		});
		await Preferences.set({ key: 'sleepData', value: JSON.stringify(plain) });
	}

	public logOvernightData(sleepData: OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
		this.saveData();
	}

	public logSleepinessData(sleepData: StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
		this.saveData();
	}
}
