import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '@app/classes/user';
import { catchError } from 'rxjs/operators';
import { RestApiServerService } from './rest-api-server.service';
import { ProfileImage } from '@app/classes/profile-image';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url:string;
  constructor(private http:HttpClient,private restapi:RestApiServerService,private spinner:SpinnerService) { 
    this.url=restapi.path+'user/';
  }


//update user by admin
updateUserByAdmin(user:User):Observable<HttpResponse<User>>{
  this.spinner.add();

  if(user!=null){
  return this.http.put<User>(this.url+user.username+'/',JSON.stringify(user),{headers: new HttpHeaders({'Content-Type': 'application/json'}),observe:'response'}).pipe(
  catchError(this.handleError)
)}
}
//update profile by user

  updateProfileByUser(user:User):Observable<HttpResponse<any>>{
    this.spinner.add();

    if(user!=null){
    return this.http.put<any>(this.url,JSON.stringify(user),
    {headers: new HttpHeaders({'Content-Type': 'application/json'}),observe:'response'}).pipe(
      catchError(this.handleError)
    );
    }
  }


  //on successfull deletion ,generic views return 204 with no response body
  deleteUserByAdmin(username:string):Observable<HttpResponse<any>>{
    this.spinner.add();

    if(username!=null){
      return this.http.delete<any>(this.url+username+'/',{headers: new HttpHeaders({'Content-Type': 'application/json'}),observe:'response'}).pipe(
          catchError(this.handleError)
        )
    }
    
        }


  //for admin only
  getUserByUsername(username:string):Observable<HttpResponse<User>>{
    this.spinner.add();

    if(username!=null){
    return this.http.get<User>(this.url+username+'/',{headers: new HttpHeaders({'Content-Type': 'application/json'}),observe:'response'}).pipe(
      catchError(this.handleError)
    )}
    }

    /* update profile image by user --->change contentType to match as below*/
    updateProfileImage(formData:FormData,filename:string):Observable<HttpResponse<any>>{
      this.spinner.add();

    return this.http.post<any>(this.url+'profile/'+filename+'/',formData).pipe(
      catchError(this.handleError)
    )
    }
    /* get profile image by user */

    getProfileImage():Observable<HttpResponse<ProfileImage>>{

      this.spinner.add();
      return this.http.get<ProfileImage>(this.url+'image/',{headers: new HttpHeaders({'Content-Type': 'image/*'}),observe:'response'}).pipe(
        catchError(this.handleError)
      );
    }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return throwError('client side Error: '+error.error.message);
    } else {
      console.error(
        `Backend returned code: ${error.status}, ` +
        `body was:${error.error.detail},`+
        
        `message was: ${error.message}` );
        if(error.status==0)
        return throwError("could not connect to server.Check your internet connection!!!");
        else{
        return throwError(error.error.detail);}
        

}};
}
