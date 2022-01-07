const valuesValidator = {}


// validate Partner values
valuesValidator.validateCreateAdmin = (values, builder, setError) => {
   setError("");
   // check name
   if (!values.first_name || !values.middle_name || !values.last_name) {
      setError('Name is required')
      return
   }
   builder.name = values.first_name + " " + values.middle_name + " " + values.last_name;

   if (values.user_type === 'admin') {
      // check username
      if (!values.username) {
         setError('Username is required');
         return
      }
      if (values.username === 'tornme') {
         setError('Username cannot be tornme');
         return
      }
      builder.username = values.username;
   } else {
      builder.username = values.username;
   }


   if (values.user_type === 'user' || values.user_type === 'anonymous') {
      // check email
      //validate the phone
      if (!values.phone_number && !values.email) {
         return setError("Either Email or Phone number is required")
      }
      if (!/^[0-9]+$/.test(values.phone_number)) {
         return setError("Phone number should be digits only")
      }
      if (!/^0/.test(values.phone_number)) {
         return setError("Phone number must start with zero. e.g (070........)")
      }
      if (values.phone_number.length !== 11) {
         return setError("Invalid phone number. Phone number expects 11 digits")
      }

      if (values.email) {
         builder.email = values.email;
      } else {
         builder.phone_number = values.phone_number
      }
   } else {
      // check email
      if (!values.email) {
         setError('Email is required')
         return
      }
      builder.email = values.email;

      if (!/^[0-9]+$/.test(values.phone_number)) {
         return setError("Phone number should be digits only")
      }
      if (!/^0/.test(values.phone_number)) {
         return setError("Phone number must start with zero. e.g (070........)")
      }
      if (values.phone_number.length !== 11) {
         return setError("Invalid phone number. Phone number expects 11 digits")
      }
      builder.phone_number = values.phone_number

   }

   //check the password
   if (!values.password) {
      return setError("password is required")
   }
   //check if its above minimum number
   if (values.password.length < 6) {
      return setError("Password must be 6 characters or more")
   }
   //check if its above minimum number
   if (values.password.length > 15) {
      return setError("Password must be less than 15 characters")
   }
   //check if there's capital letter
   if (!/[A-Z]/.test(values.password)) {
      return setError("Password must have atleast one capital letter, one small letter and one number")
   }
   //check if there's small letter
   if (!/[a-z]/.test(values.password)) {
      return setError("Password must have atleast one capital letter, one small letter and one number")
   }
   //check if there's number
   if (!/[0-9]/.test(values.password)) {
      return setError("Password must have atleast one capital letter, one small letter and one number")
   }
   builder.password = values.password



   //check the password
   if (!values.user_type) {
      return setError("User Type is required")
   }

   builder.user_type = values.user_type

   // return payload
   return builder
}


// validate Partner form
valuesValidator.validateAdminUpdate = (form, values, builder, setError) => {
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
         return setError("vendor phone number is required")
      }
      if (!/^[0-9]+$/.test(form.phone_number)) {
         return setError("vendor Phone number should be digits only")
      }
      if (!/^0/.test(form.phone_number)) {
         return setError("vendor Phone number must start with zero. e.g (070........)")
      }
      if (form.phone_number.length !== 11) {
         return setError("Invalid vendor phone number.  phone number expects 11 digits")
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





// validate Support creations 
valuesValidator.validateSupportCreate = (values, builder, setError) => {
   setError("")
   // check name
   if (!values.subject) {
      setError('Subject is required')
      return
   }
   builder.subject = values.subject;

   // check name
   if (!values.description) {
      setError('Description is required')
      return
   }
   builder.description = values.description;

   // return payload
   return builder
}


// validate Support Update/Edit form
valuesValidator.validateSupportUpdate = (form, values, builder, setError) => {
   setError("");


   //validate the first_name
   if (form.subject !== values.subject) {
      if (!form.subject) {
         return setError("Subject is required")
      }
      builder.subject = form.subject
   }

   //validate the description
   if (form.description !== values.description) {
      if (!form.description) {
         return setError("Description is required")
      }
      builder.description = form.description
   }

   if (Object.keys(builder).length === 0) {
      return setError("No changes to update")
   }
   // return payload
   return builder
}


export default valuesValidator