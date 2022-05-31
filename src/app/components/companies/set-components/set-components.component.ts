import { Component} from '@angular/core';

interface SideNavToggle 
{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-set-components',
  templateUrl: './set-components.component.html',
  styleUrls: ['./set-components.component.css']
})
export class SetComponentsComponent
{
  isSideNavCollapsed = false;
  screenWidth = 0;
  onToggleSideNav(data: SideNavToggle): void 
  {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
