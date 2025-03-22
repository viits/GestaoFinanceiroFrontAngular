import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-check',
    templateUrl: './check.component.html',
    styleUrl: './check.component.css',
    standalone: false
})
export class CheckComponent implements OnInit {

  @Input() text: string = ""
  @Input() check: boolean = false
  constructor() { }

  ngOnInit() {
  }
}
