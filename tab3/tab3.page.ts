import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab3',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  map: L.Map | any; // Retirez l'initialisation ici
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.initMap();
    this.loadCommunesData();
  }

  initMap() {
    this.map = L.map('map', {
      center: [-21.5, 165.5],
      zoom: 6
    });
    setTimeout(() => this.map.invalidateSize(), 0);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  loadCommunesData() {
    this.http.get<any[]>('assets/communes-nc_v1.json').subscribe(data => {
      data.forEach(commune => {
        const lat = parseFloat(commune.latitude);
        const lng = parseFloat(commune.longitude);
        L.marker([lat, lng]).addTo(this.map)
          .bindPopup(`${commune.Nom}: ${commune.Population} habitants`);
      });
    });
  }
}
