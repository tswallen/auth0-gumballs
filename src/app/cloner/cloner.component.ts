import { Component } from '@angular/core';
import { ClonerService } from './cloner.service';
import { SETTINGS } from '../settings/settings';

@Component({
	selector: 'app-cloner',
	templateUrl: './cloner.component.html',
	styleUrls: ['./cloner.component.sass']
})
export class ClonerComponent {
	isCloner: boolean;
	toClone: { domain: string, clientId: string } = { domain: '', clientId: '' };

	constructor(private clonerService: ClonerService, public settings: SETTINGS) { }

	/**
	 * Run when the dialog is opened
	 */
	onShow() {
		this.toClone.domain = this.settings.domain;
	}

	/**
	 * Clones the application then closes the dialog
	 */
	clone() {
		this.clonerService.cloneApplication(this.toClone);
		this.isCloner = false;
	}

}
