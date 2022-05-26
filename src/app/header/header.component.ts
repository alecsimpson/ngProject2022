import { Component } from '@angular/core';
import { DataStorageService } from '../shared/dataStorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataService: DataStorageService) {}

  onSave() {
    this.dataService.storeData()
  }

  onFetch() {
    this.dataService.fetchData();
  }

}
