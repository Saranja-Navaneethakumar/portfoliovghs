import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { CustomvalidationService } from '../customvalidation.service';
import { HandledataService } from '../handledata.service';


import { HttpClient } from '@angular/common/http';

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
      localStorage.setItem('myData', JSON.stringify(data));
    });
    this.registerform = this.fb.group(
      {
        username : new FormControl('', Validators.required),
        password : new FormControl('', Validators.compose([Validators.required, this.customvalidator.patternValidator()])),
        firstname : new FormControl('', Validators.required),
        lastname : new FormControl('', Validators.required),
        address : new FormControl('', Validators.required),
        dob : new FormControl('', Validators.required),
        contact : new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
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
    const firstname = this.registerform.value.firstname;
    const lastname = this.registerform.value.lastname; 
    const address = this.registerform.value.address;
    const dob = this.registerform.value.dob;
    const contact = this.registerform.value.contact;
    const email = this.registerform.value.email;
    const confirmpassword = this.registerform.value.confirmpassword;

    const details = { username: username, password: password, firstname:firstname,
      lastname:lastname, address:address, dob:dob, contact:contact, email:email, confirmpassword:confirmpassword};

      const currentItems = this.datastore.getItem('items') || []; 
      const emailExists = currentItems.some((item: { email: any; }) => item.email === email);
      const usernameExist = currentItems.some((item: { username: any; }) => item.username === username);
      
    if(this.registerform.valid)
    {
      if (!emailExists && !usernameExist) {
        currentItems.push(details);
        this.datastore.setItem('items', currentItems);  
        this.successalert = 'Successfully registered !'+firstname;
        this.registerform.reset();
      }
      else{
        this.failurealert = 'Invalid register!';
        this.registerform.reset();
        console.log( this.failurealert)
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
