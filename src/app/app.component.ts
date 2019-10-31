import { Component } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent {

	constructor(public authenticationService: AuthenticationService) { }

}
