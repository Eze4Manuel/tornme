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


// validate Support Update/Edit form
valuesValidator.validateContentUpdate = (form, values, builder, setError) => {
   setError("");

   //validate the text
   if (form.text !== values.text) {
      builder.text = form.text
   }

   //validate the post_tag
   if (form.access_status !== values.access_status) {
      builder.access_status = form.access_status
   }
   //validate the text
   if (form.status !== values.status) {
      builder.status = form.status
   }

   //validate the post_tag
   if (form.post_tag !== values.post_tag) {
      builder.post_tag = form.post_tag
   }
   //validate the text
   if (form.text_card_color !== values.text_card_color) {
      builder.text_card_color = form.text_card_color
   }
   //validate the text
   if (form.comment_status	 !== values.comment_status	) {
      builder.comment_status	 = form.comment_status	
   }

   if (Object.keys(builder).length === 0) {
      return setError("No changes to update")
   }
   // return payload
   return builder
}





export default valuesValidator