import { Injectable } from '@angular/core';
import { SETTINGS } from '../settings/settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/components/common/messageservice';

@Injectable({
	providedIn: 'root'
})
export class ClonerService {
	private toRemove = [
		'tenant',
		'signing_keys',
		'client_id',
		'client_secret',
		'callback_url_template',
		'owners',
		'global'
	];

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	constructor(private settings: SETTINGS, private http: HttpClient, private messageService: MessageService) { }

	/**
	 * Clones the given application and sets it as the current client ID in settings
	 * @param application the application to be cloned
	 */
	cloneApplication(application: { domain: string, clientId: string }) {
		this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `Bearer ${this.settings.managementToken}`);
		this.getApplication(application).then(
			oldApplication => this.addApplication(oldApplication).then(
				newApplication => this.settings.clientId = newApplication['client_id']
			)
		);
	}

	/**
	 * Gets existing application configuration
	 * @param application the application to be cloned
	 */
	private getApplication(application: { domain: string, clientId: string }): Promise<any> {
		return this.http.get(`https://${application.domain}/api/v2/clients/${application.clientId}`, this.httpOptions).toPromise();
	}

	/**
	 * Creates a new application with the configuration provided
	 * @param application the application to be cloned
	 */
	private addApplication(application): Promise<any> {
		const newApplication = application;
		const oldName = application.name;

		newApplication['name'] = newApplication['name'].concat(' (cloned)');

		this.toRemove.forEach(property => {
			delete newApplication[property];
		});

		return this.http.post(`https://${this.settings.domain}/api/v2/clients`, newApplication, this.httpOptions).toPromise()
			.finally(() => this.success(`${oldName} cloned successfully`));
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
