import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubscription: Subscription =  new Subscription();
  private usuario:User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>) { }


  initAuthListener() {    
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      // console.log(fbUser);
      if (fbUser) {
        this.userSubscription = this.afDB.doc(`${fbUser.uid}/usuario`)
          .valueChanges()
          .subscribe((userObj: any) => {
            const authUser = new User(userObj);
            this.store.dispatch(new SetUserAction(authUser));
            this.usuario = authUser;
          });
      } else {
        this.usuario = null;
        this.userSubscription.unsubscribe();
      }
      
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
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
            this.store.dispatch(new DesactivarLoadingAction());
          });
      })
      .catch( error => {
        // console.error(error);
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire({
          title: 'Error en el registro',
          text: error.message,
          type: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
  }

  login(email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then( resp => {
        this.router.navigate(['/']);
        this.store.dispatch(new DesactivarLoadingAction());
      })
      .catch( error => {
        // console.log(error);
        this.store.dispatch(new DesactivarLoadingAction());
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
    this.store.dispatch(new UnsetUserAction());
  }

  isAuth() {    
    return this.afAuth.authState.pipe(
      map(fbUser => {
        if (fbUser == null) {
          this.router.navigate(['/login']);
        }
        return fbUser != null
      })
    );
  }

  getUsuario(): User {
    return { ...this.usuario };
  }
}
