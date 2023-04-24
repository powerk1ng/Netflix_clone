import * as Yup from "yup";


const emailRule = /^[A-Z0-9.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;

const signUpSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter a valid email format')
        .matches(emailRule, {
            message: 'Please enter a valid email format'
        }),
        
    password: Yup.string()
        .matches(passwordRule, {
            message: 'Password must be stronger'
        })
        .min(6, 'password is too short')
        .max(20, 'password is too long'),
        

    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords not match')
    
})

export default signUpSchema