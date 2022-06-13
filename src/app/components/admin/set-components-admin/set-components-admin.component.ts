import { Component } from '@angular/core';

interface SideNavToggle 
{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-set-components-admin',
  templateUrl: './set-components-admin.component.html',
  styleUrls: ['./set-components-admin.component.css']
})

export class SetComponentsAdminComponent{

  isSideNavCollapsed = false;
  screenWidth = 0;
  onToggleSideNav(data: SideNavToggle): void 
  {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

}
