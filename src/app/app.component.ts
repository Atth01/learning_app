// Import yang diperlukan
import { Component, ViewChild } from '@angular/core';
import { IonMenu } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // Referensi ke IonMenu
  @ViewChild(IonMenu) menu!: IonMenu;

  // Daftar halaman menu
  public appPages = [
    { title: 'Penduduk', url: '/penduduk', icon: 'people' },
    { title: 'Info', url: '/info', icon: 'information' },
    { title: 'Iuran', url: '/iuran', icon: 'cash' },
    { title: 'Pesan', url: '/pesan', icon: 'chatbox' },
    { title: 'Blok', url: '/blok', icon: 'home' },
    { title: 'Surat', url: '/suratkeluar', icon: 'document' },
    { title: 'User', url: '/user', icon: 'person' },
    { title: 'Pengeluaran', url: '/pengeluaran', icon: 'wallet' },
    { title: 'Uangkeluar', url: '/uangkeluar', icon: 'cash' },
    { title: 'Diagram', url: '/report', icon: 'analytics'}
    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  constructor(private router: Router) {}

  // Fungsi untuk memicu tampilan dan penyembunyian side menu
  toggleMenu() {
    this.menu.toggle();
  }
  navigateToSocialMedia(platform: string) {
    // Implement navigation to social media pages based on the platform
    switch (platform) {
      case 'facebook':
        this.router.navigateByUrl('/facebook-page');
        break;
      case 'twitter':
        this.router.navigateByUrl('/twitter-page');
        break;
      case 'instagram':
        this.router.navigateByUrl('/instagram-page');
        break;
      case 'youtube':
        this.router.navigateByUrl('/youtube-channel');
        break;
      default:
        // Handle other cases or do nothing
        break;
    }
  }
}
