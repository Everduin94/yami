import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from '../../models/theme.model';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
  }


  testLight() {
    this.themeService.toggleTheme(Theme.LIGHT);
  }

  testDark() {
    this.themeService.toggleTheme(Theme.DARK);
  }
}
