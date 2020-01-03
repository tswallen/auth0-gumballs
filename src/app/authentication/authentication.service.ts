import { Injectable } from '@angular/core';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { SETTINGS } from '../settings/settings';
import createAuth0Client from '@auth0/auth0-spa-js';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})

export class AuthenticationService {
	client: Auth0Client;
	isAuthenticated: boolean;

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	constructor(public settings: SETTINGS, private router: Router, private http: HttpClient, private messageService: MessageService) { }

	/**
	 * Creates the Auth0Client
	 */
	async setClient() {
		if (this.client && this.client['options'].client_id === this.settings.clientId) {
			return;
		}
		await createAuth0Client({
			domain: this.settings.domain,
			client_id: this.settings.clientId,
			redirect_uri: `${window.location.origin}/callback`
		}).then(client => this.client = client);
	}

	/**
	 * Gets existing application configuration
	 * @param application the application to be cloned
	 */
	getApplications(): Promise<any> {
		this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `Bearer ${this.settings.managementToken}`);
		return this.http.get(`https://${this.settings.domain}/api/v2/clients?fields=name%2Cclient_id`, this.httpOptions).toPromise();
	}

	/**
	 * Initiates login with popup after checking the client is set
	 */
	async loginWithPopup() {
		await this.setClient();
		return this.client.loginWithPopup()
			.catch(error => this.error('loginWithPopup', error))
			.then(async () => this.isAuthenticated = await this.client.isAuthenticated())
			.finally(() => this.success('Logged in successfully'));
	}

	/**
	 * Initiates login with redirect after checking the client is set
	 */
	async loginWithRedirect() {
		await this.setClient();
		return this.client.loginWithRedirect()
			.catch(error => this.error('loginWithRedirect', error));
	}

	/**
	 * Runs silent authentication
	 */
	async loginSilently() {
		await this.setClient();
		return this.client.getTokenSilently()
			.catch(error => this.error('loginSilently', error))
			.then(async () => this.isAuthenticated = await this.client.isAuthenticated())
			.finally(() => this.success('Logged in successfully'));
	}

	/**
	 * Interprets callback URL parameters and returns to homepage
	 */
	async handleRedirectCallback() {
		const params = window.location.search;
		if (!params.includes('code=') && !params.includes('state=')) {
			return;
		}
		await this.setClient();
		await this.client.handleRedirectCallback();
		this.isAuthenticated = await this.client.isAuthenticated();
		this.router.navigate(['/'])
			.finally(() => this.success('Logged in successfully'));
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

	/**
	 * Shows a success message
	 * @param message the success message to log
	 */
	private success(message: string) {
		this.messageService.add(
			{
				severity: 'success',
				detail: message
			}
		);
	}

	/**
	 * Shows an error message
	 * @param operation the operation that failed
	 * @param message the error message provided
	 */
	private error(operation = 'operation', message: string) {
		console.error(message);
		this.messageService.add(
			{
				severity: 'error',
				summary: `Error: ${message['error']}` || `${operation} failed`,
				detail: `Description: ${message['error_description'].replace(/(.{100})..+/, '$1…')}` || 'Please see the console for more information'
			}
		);
	}
}
