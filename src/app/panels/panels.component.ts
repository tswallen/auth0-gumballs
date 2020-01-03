import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import js_beautify from 'js-beautify';
import ClipboardJS from 'clipboard';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
	selector: 'app-panels',
	templateUrl: './panels.component.html',
	styleUrls: ['./panels.component.sass']
})
export class PanelsComponent implements OnInit {
	user: string;
	accessToken: string;
	idToken: string;
	isServer: boolean;
	cache: string;
	clipboard = new ClipboardJS('.copy');

	constructor(private authenticationService: AuthenticationService, private messageService: MessageService) {
		this.clipboard.on('success', event => {
			this.messageService.add(
				{
					severity: 'success',
					detail: 'Copied to clipboard'
				}
			);
			event.clearSelection();
		});
	}

	ngOnInit() { // tslint:disable-line
		this.getIdToken();
		this.getUser();
		this.getCache();
		this.getAccessToken();
	}

	/**
	 * Retrieves the user information
	 */
	getUser(): void {
		this.authenticationService.getUser()
			.then(user => this.user = js_beautify(JSON.stringify(user)));
	}

	/**
	 * Retrieves the access token
	 */
	getAccessToken(): void {
		this.accessToken = this.authenticationService.getAccessToken();
	}

	/**
	 * Retrieves the ID token
	 */
	getIdToken(): void {
		this.idToken = this.authenticationService.getIdToken();
	}

	/**
	 * Retrieves the browser cache
	 */
	getCache(): void {
		this.cache = js_beautify(JSON.stringify(this.authenticationService.getCache()));
	}

}
