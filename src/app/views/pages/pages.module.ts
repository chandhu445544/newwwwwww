// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// NgBootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { MailModule } from './apps/mail/mail.module';
import { ECommerceModule } from './apps/e-commerce/e-commerce.module';
import { CoreModule } from '../../core/core.module';
import { ApplicationComponent } from "./application-management/application.component";
import { MaterialModule } from './material.module';
import { AccountComponent } from './account-management/account.component';
import { MatTreeModule } from '@angular/material';
import { CdkTreeModule } from '@angular/cdk/tree';
import { ApplicationFilterPipe } from './application-management/application-filter.pipe';

@NgModule({
	declarations: [ApplicationComponent,AccountComponent,ApplicationFilterPipe],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		NgbModule,
		CoreModule,
		PartialsModule,
		MailModule,
		ECommerceModule,
		MaterialModule,
		MatTreeModule,
    	CdkTreeModule,
		
	],
	providers: []
})
export class PagesModule {
}
