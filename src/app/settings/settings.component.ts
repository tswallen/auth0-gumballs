import { Component, OnInit } from '@angular/core';
import { SETTINGS } from './settings';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
	isSettings: boolean;

	constructor(public settings: SETTINGS) { }

	ngOnInit() {
		this.getSettingCookies();
	}

	/**
	 * Gets the settings cookie and sets the clientId and domain
	 */
	getSettingCookies(): void {
		const cookie = ('; ' + document.cookie).split('; settings=').pop().split(';').shift();
		if (!cookie) {
			return;
		}
		this.settings.clientId = JSON.parse(cookie)['clientId'];
		this.settings.domain = JSON.parse(cookie)['domain'];
	}

	/**
	 * Sets the current settings as a cookie
	 */
	setSettingCookies(): void {
		// TO DO: only set cookies if they have not been set before
		document.cookie = `settings=${JSON.stringify(this.settings)}`;
	}

}
