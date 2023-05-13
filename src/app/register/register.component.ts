import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { CustomvalidationService } from '../customvalidation.service';
import { HandledataService } from '../handledata.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  constructor(public fb:FormBuilder, private customvalidator:CustomvalidationService,
    private datastore:HandledataService)
  {
    
  }

  registerform : FormGroup = new FormGroup ({});

  ngOnInit(): void {

    this.datastore.getDataFromJsonFile().subscribe(data => {
      localStorage.setItem('Admin', JSON.stringify(data));
    });
    this.registerform = this.fb.group(
      {
        username : new FormControl('', Validators.required),
        password : new FormControl('', Validators.compose([Validators.required, this.customvalidator.patternValidator()])),
        regno : new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)]),
        email : new FormControl('', [Validators.required, Validators.email]),
        confirmpassword : new FormControl('', Validators.required),
        
      },
      {validator: this.customvalidator.MatchPassword('password', 'confirmpassword')}
    )
  }

  successalert:string='';
  failurealert:string='';

  onSubmit(){
    console.log(this.registerform.value);
    console.log(this.registerform.valid);

    const username = this.registerform.value.username;
    const password = this.registerform.value.password;
    const email = this.registerform.value.email;
    const regno = this.registerform.value.regno;

    const details = { username: username, password: password, email:email, regno:regno};

      const students = this.datastore.getItem('students') || []; 
      const regnoexists = students.some((item: { regno: any; }) => item.regno === regno);
      var filterstudent = students.filter((item: { regno: any; }) => item.regno == regno);

      const registeritems = this.datastore.getItem('register') || []; 
      const alreadyregistered = registeritems.some((item: { regno: any; }) => item.regno === regno);
    if(this.registerform.valid)
    {
      if (regnoexists && !alreadyregistered) {
        for (var i = 0; i < filterstudent.length; i++) {
          if(username == filterstudent[i].username && password == filterstudent[i].password && email == filterstudent[i].email 
            && regno == filterstudent[i].regno){
              registeritems.push(details);
              this.datastore.setItem('register', registeritems);  
              this.successalert = 'Successfully registered You can login!'+username;
              this.registerform.reset();
          }
          else{
            if(username != filterstudent[i].username){
              this.failurealert = 'Invalid Username!';
            }
            else if(password != filterstudent[i].password){
            this.failurealert = 'Invalid Password!';
           }
            else if(email != filterstudent[i].email){
              this.failurealert = 'Invalid Email!';
            }
            else if(regno != filterstudent[i].regno){
              this.failurealert = 'Invalid Registration number!';
            }
            else{
              this.failurealert = 'Invalid Register Please check ypur details and try again!';
            }
            this.registerform.reset();
          }
        }
        
      }
      else{
        if(!regnoexists){
          this.failurealert = 'Invalid register Registration number is not exists!';
        }
        else if(alreadyregistered){
          this.failurealert = 'Invalid register Registration number is already exists!';
        }
        this.registerform.reset();
        
      }
      
    }
  }

  get registerForm()
  {
      return this.registerform.controls;
  }

 

}














// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

// import { CustomvalidationService } from '../customvalidation.service';
// import { HandledataService } from '../handledata.service';


// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {
  
//   constructor(public fb:FormBuilder, private customvalidator:CustomvalidationService,
//     private datastore:HandledataService)
//   {
    
//   }

//   registerform : FormGroup = new FormGroup ({});

//   ngOnInit(): void {

//     this.datastore.getDataFromJsonFile().subscribe(data => {
//       localStorage.setItem('myData', JSON.stringify(data));
//     });
//     this.registerform = this.fb.group(
//       {
//         username : new FormControl('', Validators.required),
//         password : new FormControl('', Validators.compose([Validators.required, this.customvalidator.patternValidator()])),
//         firstname : new FormControl('', Validators.required),
//         lastname : new FormControl('', Validators.required),
//         address : new FormControl('', Validators.required),
//         dob : new FormControl('', Validators.required),
//         contact : new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
//         email : new FormControl('', [Validators.required, Validators.email]),
//         confirmpassword : new FormControl('', Validators.required),
        
//       },
//       {validator: this.customvalidator.MatchPassword('password', 'confirmpassword')}
//     )
//   }

//   alert:string='';

//   onSubmit(){
//     console.log(this.registerform.value);
//     console.log(this.registerform.valid);

//     const username = this.registerform.value.username;
//     const password = this.registerform.value.password;
//     const firstname = this.registerform.value.firstname;
//     const lastname = this.registerform.value.lastname; 
//     const address = this.registerform.value.address;
//     const dob = this.registerform.value.dob;
//     const contact = this.registerform.value.contact;
//     const email = this.registerform.value.email;
//     const confirmpassword = this.registerform.value.confirmpassword;

//     const details = { username: username, password: password, firstname:firstname,
//       lastname:lastname, address:address, dob:dob, contact:contact, email:email, confirmpassword:confirmpassword};

//       const currentItems = this.datastore.getItem('items') || []; 
//       currentItems.push(details);
//       this.datastore.setItem('items', currentItems);
     
//     if(this.registerform.valid)
//     {
//       this.alert = 'Successfully registered !'+firstname;
//       this.registerform.reset();
//     }
    
      
    
//   }

//   get registerForm()
//   {
//       return this.registerform.controls;
//   }

 

// }
