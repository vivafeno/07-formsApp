import { Component } from '@angular/core';

interface menuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'shared-side-menu',
  standalone: false,
  
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent {

  public reactiveMenu : menuItem[] = [  
    {title: 'Básicos', route: './reactive/basic'},
    {title: 'Dinámicos', route: './reactive/dynamic'},
    {title: 'Switches', route: './reactive/switches'},
  ];


  public authMenu : menuItem[] = [  
    {title: 'Registro', route: './auth'},
  ];

}
