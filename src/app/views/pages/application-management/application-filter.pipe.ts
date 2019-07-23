import { PipeTransform, Pipe } from '@angular/core';
import { Application } from '../model/Application.';

@Pipe({
    name: 'applicationFilter'
})
export class ApplicationFilterPipe implements PipeTransform {
    transform(applications: Application[], searchApplication: string) :Application[]{
        if (!applications || !searchApplication || searchApplication.length <3) {
            return applications;
        }
        return applications.filter(application => application.applicationName.toLowerCase().indexOf(searchApplication.toLowerCase()) != -1);
    }

}