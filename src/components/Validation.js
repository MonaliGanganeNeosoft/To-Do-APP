import React, { Component } from 'react'
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = /^[a-zA-Z ]{2,100}$/;
const regforLastname=/^[a-zA-Z ]{2,100}$/;

const regforUsername=/^[a-zA-Z0-9]+$/;

export class Validation extends Component {
    constructor(props){
        super(props);
        this.state={
            name:null,

            lastname:null,

            username:null,

            email:null,
            password:null,
            confirmpassword:null,
           
            errors:{


                name:'',
                email:'',
                
                lastname:'',

                username:'',

                password:'',
                confirmpassword:'',
               
            },
            names:[],
            emails:[],
          
            lastnames:[],
            
            usernames:[],

            passwords:[],
            mobiles:[]
           
            

        }
    }
    
        handler=(event)=>{
            const {name,value}=event.target;
            let errors=this.state.errors;
            switch(name){
                
                case 'name':
                    errors.name=regForName.test(value)?'':'Name is not valid';
                    break;
               
                case 'lastname':
                    errors.lastname=regforLastname.test(value)?'':'last Name is not valid';
                    break;
    
                case 'username':
                    errors.username=regforUsername.test(value)?'':'User Name is not valid';
                    break;
    


                case 'email':
                    errors.email=regForEmail.test(value)?'':'Email is not valid';
                    break;
               
                case 'password':
                    errors.password=value.length<8?'Password must be 8 chanraters long':'';
                    break;
                case 'confirmpassword':
                    errors.confirmpassword=this.state.password!==value ?'Password dont match':'';
                                      
                    break;
               
            }
            this.setState({errors,[name]:value},()=>{
                console.log(errors)
            })
            
        }
        formSubmit=(event)=>{
           event.preventDefault();
           
           if(this.validate(this.state.errors)&&(document.getElementById("name").value!=='')&&(document.getElementById("lastname").value!=='')&&(document.getElementById("username").value!=='')&&(document.getElementById("email").value!=='')&&(document.getElementById("password").value!=='')&&(document.getElementById("confirmpassword").value!==''))
           {
               alert("Form Submitted");
               var names = this.state.names;
                names.push(this.state.name);

                var lastnames = this.state.lastnames;
                lastnames.push(this.state.lastname);

                var usernames = this.state.usernames;
                usernames.push(this.state.username);
                
                var emails = this.state.emails;
                emails.push(this.state.email)
                
                
                var passwords = this.state.passwords;
                passwords.push(this.state.password)

                fetch("http://localhost:3001/users",{
                    method:"POST",
                    body:JSON.stringify({
                        name :  this.state.name,
                        lastname :  this.state.lastname,
                        username :  this.state.username,
                        email :  this.state.email,
                        password :  this.state.password,
                    }),
                    headers:{
                        "Content-type":"application/json"
                    }
                })
                .then(res=> res.json())
                .then(data=>{
                    alert("Employee Details Added");
                    document.getElementById("myForm").reset();
                    document.location.replace("/login");
                })

                // console.log(userData)
                
                this.setState({
                    names: names,
                    name: "",
                
                    lastnames: lastnames,
                    lastname: "",

                    usernames: usernames,
                    username: "",
                
                    emails: emails,
                    email: "",
                    
                    passwords: passwords,
                    password:"",
                });
           }
           else {
               alert("Please Enter Valid Data");
           }
        }
         validate=(errors)=>{
            let valid=true;
            Object.values(errors).forEach((val)=> val.length >0 && (valid=false));
            return valid;
        }
        
        


    render() {
        const {errors}=this.state;
        return (
            <div>
                <h2> Registeration to TO-do APP</h2>
                <form onSubmit={this.formSubmit} className="container-fluid" id="myForm">
                    
                    <div className="row">
                    <div className="form-group col-md-3">
                        
                    <label class="form-label float-left">Name: </label><input type="name" name="name" id="name" class="form-control"  onChange={this.handler}/>
                    </div>
                     {errors.name.length>0 && 
                    <div className="alert alert-danger col-md-3"  style={{color:'red'}}>{errors.name}</div>}<br/>
                    </div>

                    <div className="row">
                    <div className="form-group col-md-3">
                        
                    <label class="form-label float-left">Last Name: </label><input type="lastname" name="lastname" id="lastname" class="form-control"  onChange={this.handler}/>
                    </div>
                     {errors.lastname.length>0 && 
                    <div className="alert alert-danger col-md-3"  style={{color:'red'}}>{errors.lastname}</div>}<br/>
                    </div>
                    
                    <div className="row">
                    <div className="form-group col-md-3">
                        
                    <label class="form-label float-left">Username: </label><input type="username" name="username" id="username" class="form-control"  onChange={this.handler}/>
                    </div>
                     {errors.username.length>0 && 
                    <div className="alert alert-danger col-md-3"  style={{color:'red'}}>{errors.username}</div>}<br/>
                    </div>
                    
                    <div className="row">
                    <div className="form-group col-md-3">
                    <label class="form-label float-left">Email: </label><input type="text" name="email" id="email" class="form-control" onChange={this.handler}/>
                    </div>
                     {errors.email.length>0 && 
                    <span className="alert alert-danger col-md-3" style={{color:'red'}}>{errors.email}</span>}<br/>
                    </div>
                   
                    
                    
                    <div className="row">
                    <div className="form-group col-md-3">
                    <label class="form-label float-left">Password: </label> <input type="password" id="password" name="password" class="form-control" onChange={this.handler}/>
                    </div>
                    {errors.password.length>0 && 
                    <span className="alert alert-danger col-md-3" style={{color:'red'}}>{errors.password}</span>}<br/>
                    </div>
                   
                    <div className="row">
                    <div className="form-group col-md-3">
                    <label class="form-label float-left">Confirm Password: </label> <input type="password" id="confirmpassword" name="confirmpassword" class="form-control" onChange={this.handler}/>
                    </div>
                    {errors.confirmpassword.length>0 && 
                    <span className="alert alert-danger col-md-3" style={{color:'red'}}>{errors.confirmpassword}</span>}<br/>
                    </div>
                    
                    
                    <div className="form-group col-md-3">
                    <input type="submit" value="submit" className="btn btn-primary"  onClick={this.handler.bind("Submit")}/>
                    </div>
                </form>

                <br/><br/>
            </div>
        )
    }
}
export default Validation;