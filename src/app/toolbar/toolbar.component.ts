import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

import { SETTINGS } from '../settings/settings';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent {

	constructor(public settings: SETTINGS, public authenticationService: AuthenticationService) { }

	/**
	 * Runs the login
	 */
	login(): void {
		this.authenticationService.login();
	}

	/**
	 * Runs the logout
	 */
	logout(): void {
		this.authenticationService.logout();
	}

}
