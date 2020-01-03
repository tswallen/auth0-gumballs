/* tslint:disable:no-string-literal */
import { Component, OnInit } from '@angular/core';
import { SETTINGS } from './settings';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
	isSettings: boolean;
	applications: { name: string, client_id: string }[];
	application: { name: string, client_id: string };

	constructor(public settings: SETTINGS, private authenticationService: AuthenticationService) { }

	ngOnInit() { // tslint:disable-line
		this.getSettingCookies();
		this.authenticationService.handleRedirectCallback();
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
		this.settings.managementToken = JSON.parse(cookie)['managementToken'];
	}

	/**
	 * Sets the current settings as a cookie
	 */
	setSettingCookies(): void {
		// TO DO: only set cookies if they have not been set before
		document.cookie = `settings=${JSON.stringify(this.settings)}`;
	}

	/**
	 * Gets a list of applications
	 */
	getApplications(): void {
		if (this.applications || !this.settings.managementToken) {
			return;
		}
		this.authenticationService.getApplications()
			.then(applications => {
				this.applications = applications;
				this.resolveApplication();
			});
	}

	/**
	 * Determines the current application object based on it's client_id
	 */
	private resolveApplication() {
		this.application = this.applications.find(application => application.client_id === this.settings.clientId);
	}
}
