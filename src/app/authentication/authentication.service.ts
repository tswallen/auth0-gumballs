import { Injectable } from '@angular/core';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { SETTINGS } from '../settings/settings';
import createAuth0Client from '@auth0/auth0-spa-js';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	client: Auth0Client;
	isAuthenticated: boolean;

	constructor(public settings: SETTINGS) { }

	/**
	 * Creates the Auth0Client
	 */
	async setClient() {
		await createAuth0Client({
			domain: this.settings.domain,
			client_id: this.settings.clientId,
			redirect_uri: `${window.location.origin}/callback`
		}).then(client => this.client = client);
	}

	/**
	 * Initiates login after checking the client is set
	 */
	async login() {
		if (!this.client) {
			await this.setClient();
		}
		return this.client.loginWithPopup()
			.then(async () => this.isAuthenticated = await this.client.isAuthenticated());
	}

	/**
	 * Runs the logout function then returns to the home page
	 */
	logout() {
		this.client.logout({ returnTo: window.location.origin });
		return async () => this.isAuthenticated = await this.client.isAuthenticated();
	}

	/**
	 * Returns the parsed and validated ID token
	 */
	getUser() {
		return this.client.getUser();
	}

	/**
	 * Returns the cached access token
	 */
	getAccessToken(): string {
		return Object.values(this.client['cache']['cache'])[0]['access_token'];
	}

	/**
	 * Returns the cached ID token
	 */
	getIdToken(): string {
		return Object.values(this.client['cache']['cache'])[0]['id_token'];
	}

	/**
	 * Returns the cache set by auth0
	 */
	getCache(): {} {
		return Object.values(this.client['cache']['cache'])[0];
	}
}
