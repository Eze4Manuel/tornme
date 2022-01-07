const valuesValidator = {}
 

// validate Partner values
valuesValidator.validateResetUserPassword = (values, builder, setError) => {
   setError("");

   // check email
   if (!values.confirm_password) {
      setError('Confirm Password is required')
      return
   }
   builder.confirm_password = values.confirm_password;

   //check the new_password
   if (!values.new_password) {
      return setError("New Password is required")
   }
   //check if its above minimum number
   if (values.new_password.length < 6) {
      return setError("Password must be 6 characters or more")
   }
   //check if its above minimum number
   if (values.new_password.length > 15) {
      return setError("Password must be less than 15 characters")
   }
   //check if there's capital letter
   if (!/[A-Z]/.test(values.new_password)) {
      return setError("Password must have atleast one capital letter, one small letter and one number")
   }
   //check if there's small letter
   if (!/[a-z]/.test(values.new_password)) {
      return setError("Password must have atleast one capital letter, one small letter and one number")
   }
   //check if there's number
   if (!/[0-9]/.test(values.new_password)) {
      return setError("Password must have atleast one capital letter, one small letter and one number")
   }   
   builder.new_password = values.new_password

   // return payload
   return builder
}

 


export default valuesValidator