import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/services/user.service';
import { ShareUserService } from '@app/services/share-user.service';
import { ProfileImage } from '@app/classes/profile-image';
import { SpinnerService } from '@app/services/spinner.service';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styles: [``]
})
export class ProfileImageComponent implements OnInit {
public image_object:ProfileImage;
public is_error:boolean=false;
public imagefile:File=null;
public want_to_update:boolean=false;

  constructor(private shareUser:ShareUserService,private userService:UserService,private spinner:SpinnerService) { }

  ngOnInit(): void {

  this.shareUser.getProfileImage().subscribe(resp=>this.image_object=resp);
  }

  /* when user selects image for upload */
  onFileSelect(event) {
    if (event.target.files.length > 0) {

      const file:File= event.target.files[0];
      if(file.size<=100000){//100  kb....
        console.log(file.size)
      this.imagefile=file;
      this.is_error=false;
      }
      else
      this.is_error=true;
    }
      else
      this.is_error=true;
    
  }
  

  onSubmit(){
  
    if(!this.is_error && this.imagefile!=null){
      let filename=this.imagefile.name;
      
      /* new instance of formData containing iamge to be send */
      let formData:FormData=new FormData();
      formData.append('file',this.imagefile);
  this.userService.updateProfileImage(formData,filename).subscribe(resp=>
  {  this.spinner.remove();  
    alert("profile image successfully updated...refresh profile")
  },
    error=>{
      this.spinner.remove();
      alert(error);}
    );}
    this.want_to_update=false;

  }

  /* if user clicks on 'edit photo' image   */
    updateProfileImage(){
      this.want_to_update=true;
    }
  



}
