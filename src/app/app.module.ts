import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import 'prismjs/components/prism-json.js';

import { SETTINGS } from './settings/settings';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SettingsComponent } from './settings/settings.component';
import { PanelsComponent } from './panels/panels.component';
import { AppRoutingModule } from './app-routing.module';
import { MessageService } from 'primeng/components/common/messageservice';
import { ClonerComponent } from './cloner/cloner.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		AppComponent,
		SettingsComponent,
		ToolbarComponent,
		PanelsComponent,
		ClonerComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		ToastModule,
		ToolbarModule,
		DialogModule,
		InputTextModule,
		SplitButtonModule,
		ButtonModule,
		TooltipModule,
		PanelModule,
		CodeHighlighterModule,
		HttpClientModule,
		DropdownModule
	],
	providers: [
		SETTINGS,
		MessageService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
