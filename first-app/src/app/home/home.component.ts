import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseLocationComponent } from '../house-location/house-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HouseLocationComponent, RouterModule],
  template: `
      <section>
        <form>
          <input type="text" placeholder="Filter by city" #filter/>
          <button class="primary" type="button" (click) = "filterResults(filter.value)">Search</button>
        </form>
      </section>
      <section class="results">
        <app-house-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"></app-house-location>
      </section>
  `,
  styles: [
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];

  housingService: HousingService = inject(HousingService);

  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations()
    .then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(text: string) {
    if (!text) this.filteredLocationList = this.housingLocationList;

    this.filteredLocationList = this.housingLocationList.filter(housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())) 
      && this.housingLocationList.filter(housingLocation => housingLocation?.state.toLowerCase().includes(text.toLowerCase()))
      && this.housingLocationList.filter(housingLocation => housingLocation?.name.toLowerCase().includes(text.toLowerCase()));
  }
}
