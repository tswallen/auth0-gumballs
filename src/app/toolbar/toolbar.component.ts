import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

import { SETTINGS } from '../settings/settings';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent {
	loginOptions = [
		{
			label: 'Login with redirect',
			icon: 'pi pi-sign-in',
			command: () => { this.login(false); }
		},
		{
			label: 'Login with popup',
			icon: 'pi pi-sign-in',
			command: () => { this.login(true); }
		}
	];

	constructor(public settings: SETTINGS, public authenticationService: AuthenticationService) { }

	/**
	 * Runs the login
	 */
	login(popup: boolean): void {
		this.authenticationService.login(popup);
	}

	/**
	 * Runs the logout
	 */
	logout(): void {
		this.authenticationService.logout();
	}

}
