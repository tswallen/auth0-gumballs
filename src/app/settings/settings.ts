export class SETTINGS {
	domain: string;
	clientId: string;
	managementToken?: string;
	applications?: Application[];
}

export class Application {
	name: string;
	client_id: string; // tslint:disable-line
}
