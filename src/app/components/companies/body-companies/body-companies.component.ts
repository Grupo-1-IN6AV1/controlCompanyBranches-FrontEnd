import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body-companies',
  templateUrl: './body-companies.component.html',
  styleUrls: ['./body-companies.component.css']
})
export class BodyCompaniesComponent
{

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 480) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 480 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }
}
