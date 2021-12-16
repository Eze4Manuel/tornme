const formValidator = {}

// validate Partner form
formValidator.changePassword = (values, builder, setError) => {
   setError("")

   // check phone_number
   if (!values.old_password) {
      setError('input your old password');
      return;
   } else {
      builder.old_password = values?.old_password
   }

   if (!values.new_password) {
      setError('input your old password');
      return;
   } else {
      builder.new_password = values?.new_password
   }
   if (!values.confirm_password) {
      setError('input your confirm password');
      return;
   } 
   if (values.confirm_password != values.new_password) {
      setError('confirm password does not match');
      return;
   } 
   else {
      builder.confirm_password = values?.confirm_password
   }
   return builder
}





export default formValidator