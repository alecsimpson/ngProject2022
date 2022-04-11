import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() navSelection = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onNavSelection(event): void {
    this.navSelection.emit(event.target.innerText);
  }

}
