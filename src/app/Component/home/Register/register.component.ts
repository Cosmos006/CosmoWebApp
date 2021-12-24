import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/Services/Userservice/userservice/user.service';

import Keyboard from "simple-keyboard";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userData: any;
  registrationform! : FormGroup
  keyboard!: Keyboard;
  value = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public userService: UserService, public _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.userService.formModel.reset();
    
    //this.user.currentUserData.subscribe(userData => this.userData = userData)
  }
  signUp(data:any){
    
    //this.user.changeData(data);
  }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: (button: string) => this.onKeyPress(button),
      mergeDisplay: true,
      layoutName: "default",
      layout: {
        default: [
          "q w e r t y u i o p",
          "a s d f g h j k l",
          "{shift} z x c v b n m {backspace}",
          "{numbers} {space} {ent}"
        ],
        shift: [
          "Q W E R T Y U I O P",
          "A S D F G H J K L",
          "{shift} Z X C V B N M {backspace}",
          "{numbers} {space} {ent}"
        ],
        numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {backspace}"]
      },
      display: {
        "{numbers}": "123",
        "{ent}": "return",
        "{escape}": "esc ⎋",
        "{tab}": "tab ⇥",
        "{backspace}": "⌫",
        "{capslock}": "caps lock ⇪",
        "{shift}": "⇧",
        "{controlleft}": "ctrl ⌃",
        "{controlright}": "ctrl ⌃",
        "{altleft}": "alt ⌥",
        "{altright}": "alt ⌥",
        "{metaleft}": "cmd ⌘",
        "{metaright}": "cmd ⌘",
        "{abc}": "ABC"
      }
      
    });
  }

  onChange = (input: string) => {
    this.value = input;
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  handleNumbers() {
    let currentLayout = this.keyboard.options.layoutName;
    let numbersToggle = currentLayout !== "numbers" ? "numbers" : "default";

    this.keyboard.setOptions({
      layoutName: numbersToggle
    });
  }

  onSubmit() {
    // console.log(this.userService.formModel.value.Password)
    // console.log(this.userService.formModel.value.ConfirmPassword)
    if (
      this.userService.formModel.value.Password ===
      this.userService.formModel.value.ConfirmPassword
    ) {
      this.userService.register().subscribe({
        next: (res: any) => {
          console.log(res)
          if (res) {
            console.log('In next sub')
            this.userService.formModel.reset();
            this._snackBar.open('Registration Successful', 'Done', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 5000,
            });
            //this.toastr.success('New user created!', 'Registration successful.');
          } else {
            console.log(res)
            console.log('In next sub')
            res.errors.forEach((element: { code: any; description: any }) => {
              switch (element.code) {
                case 'DuplicateUserName':
                  this._snackBar.open('Duplicate Username.', 'Failed', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 5000,
                  });
                  //this.toastr.error('Username is already taken','Registration failed.');
                  break;

                default:
                  this._snackBar.open('Registration Failed.', '', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 5000,
                  });
                  break;
              }
            });
          }
        },
        error: (e) => console.error(e),
      });
      console.log('In out sub')
    }
    else{
      console.log('hii')
      this._snackBar.open('Password and Confirm Password mismatch', '', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000,
      });
    }
  }


}
