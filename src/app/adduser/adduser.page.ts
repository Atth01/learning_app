import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.page.html',
  styleUrls: ['./adduser.page.scss'],
})
export class AdduserPage implements OnInit {
  newUserData: any = {};
  public kd_penduduk: string = '';
  public nik: string = '';
  public email: string = '';
  public username: string = '';
  public password: string = '';
  public dentry: any;


  constructor(
    private _apiService: ApiserviceService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }
  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
  async addNewUser() {
    try {
      const formData = new FormData();
      formData.append('kd_pnddk', this.nik);
      formData.append('nik', this.nik);
      formData.append('email', this.username);
      formData.append('username', this.username);
      formData.append('password', this.password);
      const response = await this._apiService.createUser(formData);

      if (response.msg === 'ok') {
        // Data added successfully, you can navigate to another page or show a success message
        this.presentToast('Info added successfully', 'success');
        // For example, navigate back to the previous page
        this.navCtrl.navigateForward('/user')
      } else if (response.msg === 'notOk') {
        // Handle the case when data addition fails
        this.presentToast('Failed to add info', 'danger');
      } else {
        // Handle other error cases
        this.presentToast('Something went wrong', 'danger');
      }
    } catch (err: any) {
      console.log(err);
      // Handle unexpected errors
      this.presentToast('An error occurred', 'danger');
    }
  }
  goToUserPage() {
    // Ganti 'info' dengan path yang sesuai untuk halaman info Anda
    this.navCtrl.navigateForward('/user')
  }

  ngOnInit() {
  }

}
