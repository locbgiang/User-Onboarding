import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required('Name is a required field'),
    email: yup.string().email().required('Must include an email'),
    password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is a required field'),
    terms: yup.boolean().oneOf([true], "Please agree to terms of use"),
})

function Form (props){
    const [formValue, setFormValue] = useState ({
        name: '',
        email: '',
        password: '',
        terms: ''
    })
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        terms: ''
    })
    const [buttonDisabled, setButtonDisabled] = useState (true);
    const [post, setPost] = useState([]);

    useEffect(()=>{
        formSchema.isValid(formValue).then(valid => {
            setButtonDisabled(!valid);
        });
    },[formValue]);

    const validateChange = event => {
        yup
            .reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then(valid=>{
                setErrors({
                ...errors,
                [event.target.name]: ''
                });
            })
            .catch( err => {
                setErrors({
                    ...errors, 
                    [event.target.name]: err.errors
                });
            });
    };
    const formSubmit = event => {
        event.preventDefault();
        axios
          .post("https://reqres.in/api/users", formValue)
          .then(res => {
            setPost(res.data);
            setFormValue({
              name: '',
              email: '',
              password: '',
              terms: ''
            });
          })
          .catch(err => {
            console.log(err.res);
          });
        const newUser = {
            name: formValue.name,
            email: formValue.email,
            password: formValue.password,
            terms: formValue.terms
        }
        props.setUsers([...props.users, newUser]);
    }
    const inputChange = event => {
        event.persist();
        const newFormData = {
            ...formValue, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked: event.target.value
        }
        validateChange(event);
        setFormValue(newFormData);
    }
    return(
        <form onSubmit = {formSubmit}>
            <label htmlFor='name'>Name
                <input 
                    id = 'name'
                    type = 'text'
                    name = 'name'
                    value = {formValue.name}
                    onChange = {inputChange}
                />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label><br/>
            <label htmlFor = 'email'>Email
                <input 
                    id = 'email'
                    type = 'text'
                    name = 'email'
                    value = {formValue.email}
                    onChange = {inputChange}
                />
                {errors.email.length > 0 ? (<p className="error"> {errors.email}</p>) : null}
            </label><br/>
            <label htmlFor = 'password'>Password
                <input 
                    id = 'password'
                    type = 'text'
                    name = 'password'
                    value = {formValue.password}
                    onChange = {inputChange}
                />
                {errors.password.length > 0 ? (<p className="error"> {errors.password}</p>) : null}
            </label><br/>
            <label htmlFor = 'terms'>Term of service
                <input 
                    id = 'terms'
                    type= 'checkbox'
                    name = 'terms'
                    checked = {formValue.terms}
                    onChange = {inputChange}
                />
            </label><br/>
            <button disabled = {buttonDisabled}>Submit</button>
        </form>
    );
}
export default Form;