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
			icon: 'pi pi-refresh',
			command: () => { this.loginWithRedirect(); }
		},
		{
			label: 'Login with popup',
			icon: 'pi pi-external-link',
			command: () => { this.loginWithPopup(); }
		}
	];

	constructor(public settings: SETTINGS, public authenticationService: AuthenticationService) { }

	/**
	 * Runs the login with popup
	 */
	loginWithPopup(): void {
		this.authenticationService.loginWithPopup();
	}

	/**
	 * Runs the login with redirect
	 */
	loginWithRedirect(): void {
		this.authenticationService.loginWithRedirect();
	}

	/**
	 * Runs the logout
	 */
	logout(): void {
		this.authenticationService.logout();
	}

}
