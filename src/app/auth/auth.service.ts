import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import * as firebase from 'firebase';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore) { }


  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      console.log(fbUser);
      
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then( resp => {
        // console.log(resp);
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email
        };
        this.afDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then( () => {
            this.router.navigate(['/']);
          });
      })
      .catch( error => {
        // console.error(error);
        Swal.fire({
          title: 'Error en el registro',
          text: error.message,
          type: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
  }

  login(email: string, password: string) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then( resp => {
        this.router.navigate(['/']);
      })
      .catch( error => {
        // console.log(error);
        Swal.fire({
          title: 'Error en el login',
          text: error.message,
          type: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
  }

  logout (){
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }
}
