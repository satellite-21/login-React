import React from "react";
import { useState  } from "react";
import genericStyles from './form.module.scss'
import { TRUE } from "sass";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


interface WebFormProps {
    //definition of props will come here

}

const WebForm: React.FC<WebFormProps> = (props) => {
    

    const [isFormValid, setIsFormValid] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const isFieldEmpty = (fieldValue : string) =>{
        const whitespaceRegex = /^\s*$/;
        return whitespaceRegex.test(fieldValue);
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} =  e.target;
        setFormData({ ...formData, [name]: value});

        const isNameEmpty = name === "name" && isFieldEmpty(value);
        const isEmailInvalid = name === "email" && !validateEmail(value);
        const isMessageEmpty = name === "message" && isFieldEmpty(value);

        setIsFormValid(!isNameEmpty && !isEmailInvalid && !isMessageEmpty);

    };      


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // if(validateEmail(formData.email) && formData.name.trim() !== "" && formData.message.trim() !== "") {
            if(isFormValid){
            console.log(formData);
            alert(`Thank you! Form Data: ${JSON.stringify(formData)}`);
            setSuccessMessage("Submitted!");
            setTimeout(() => {
                setSuccessMessage("");
              }, 1000);
            setFormData({
                name: '',
                email:'',
                message: ''
            });

        }else if (!validateEmail(formData.email)){
            alert("Invalid Email!");
            console.log("Error! Invalid Email");
        } else{
            alert("Null or Spaces not Accepted!");
            console.log("Null Value(s) found ");
        }

        
    } ;

    const validateEmail = (email: string) => {
        // email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);

    };
    // const notify = () => toast("Raising a Toast!");


    return (

        <div className={genericStyles.formContainer}>
       <form onSubmit={handleSubmit}>
            <h2>FILL THIS FORM!</h2>
            <div className={genericStyles.labelInput}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={genericStyles.labelInput}>
                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={genericStyles.labelInput}>
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}    
                    onChange={handleChange}
                    required
                />
            </div>
           <div className={genericStyles.buttonDiv}><button  className={genericStyles.button} type="submit" disabled={!isFormValid}>Submit</button>
            {/* <ToastContainer /> */}
            </div>

        </form>
        
            {successMessage && <div className={genericStyles.successMessage}>{successMessage}</div>}
        </div>
 
    );
};
export default WebForm;

