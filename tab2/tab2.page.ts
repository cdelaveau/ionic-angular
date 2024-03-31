import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonIcon, IonTabButton, IonLabel, IonFabButton, IonGrid, IonRow, IonCol, IonImg } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonIcon, IonTabButton, IonLabel, IonFabButton, IonGrid, IonRow, IonCol, IonImg, NgFor, ExploreContainerComponent]
})
export class Tab2Page {
  public photos: string[] = [];

  constructor() {}

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });
  
      if (image.webPath) {
        this.photos.push(image.webPath);
      } else {
        console.error('La photo n\'a pas de chemin web défini.');
      }
    } catch (error) {
      console.error('Erreur lors de la prise de photo:', error);
    }
  }  
}
