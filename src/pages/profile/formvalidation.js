const valuesValidator = {}
 
 



// validate Partner values
valuesValidator.validateProfilePassword = (values, builder, setError) => {
   setError("")

   // check name
   if (!values.old_password) {
      setError('Old passwors is required')
      return
   }
   builder.old_password = values.old_password;


   
   //check the password
   if (!values.new_password) {
      return setError("password is required")
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


   // check name
   if (values.confirm_password !== values.new_password) {
      setError('Paswword Mismatch')
      return
   }

   // check name
   if (!values.confirm_password) {
      setError('Confirm password before proceeding')
      return
   }
   builder.confirm_password = values.confirm_password;
 

   builder.user_type = 'admin'

   // return payload
   return builder
}






// validate Partner form
valuesValidator.validateProfileUpdate = (form, values, builder, setError) => {
   setError("");
 

   //validate the first_name
   if (form.name !== values.name) {
      if (!form.name) {
         return setError("Name is required")
      }
      builder.name = form.name
   }

    //validate the last_name
    if (form.username !== values.username) {
      if (!form.username) {
         return setError("Username is required")
      }
      if (form.username === 'tornme') {
         return setError("Username cannot be Tornme")
      }
      builder.username = form.username
   }

   //validate the phone
   if (form.phone_number !== values.phone_number) {
      if (!form.phone_number) {
         return setError("phone number is required")
      }
      if (!/^[0-9]+$/.test(form.phone_number)) {
         return setError("Phone number should be digits only")
      }
      if (!/^0/.test(form.phone_number)) {
         return setError("Phone number must start with zero. e.g (070........)")
      }
      if (form.phone_number.length !== 11) {
         return setError("Invalid phone number.  phone number expects 11 digits")
      }
      builder.phone_number = form.phone_number
   }

   //validate the email
   if (form.email !== values.email) {
      if (!form.email) {
         return setError("Email is required")
      }
      builder.email = form.email
   }

    //validate the email
    if (form.access_level !== values.access_level) {
      if (!form.access_level) {
         return setError("Access level is required")
      }
      builder.access_level = form.access_level
   }

   if (Object.keys(builder).length === 0) {
      return setError("No changes to update")
   }
   // return payload
   return builder
}


export default valuesValidator