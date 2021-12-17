const formValidator = {}

const validate = (phone) => {
   if (!isNaN(phone)) {
      return true;
   } else {
      return false;
   }
}

// validate Partner form
formValidator.resetPassword = (values, builder, setError) => {
   setError("")

   // check phone_number
   if (!values.login) {
      setError('phone number or username is required')
      return
   }
   if (!validate(values.login)) {
      builder.email = values?.login
   } else {
      builder.phone_number = values?.login
      if (builder.phone_number.length > 11 || builder.phone_number.length > 11) {
         setError('Phone number is incorrect');
         return;
      }
   }
  

   // return payload
   return builder
}



export default formValidator