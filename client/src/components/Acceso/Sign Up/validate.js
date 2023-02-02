//Validación de Formulario
export default function validateForm(inputs) {
    let errors = { };
    const name_REGEX = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
    const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const email_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phone_REGEX = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{1})/;
  
    if(inputs.fullName.length < 4) { errors.name = '❌ Name too short' }
    else if(inputs.fullName.length > 24) { errors.name = '❌ Name too long' }
    else if(!name_REGEX.test(inputs.fullName)) { errors.name = '❌ 4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.' }
  
    if(!inputs.password) { errors.password = '❌ Type a password' }
    else if(!password_REGEX.test(inputs.password)) { errors.password = '❌ 8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character. Allowed special characters:{"!,#,@,#,$,%"}' }
    
    if(!inputs.password2) { errors.password2 = '❌ Reapeat password' }
    else if(inputs.password !== inputs.password2) { errors.password2 = '❌ Must match the first password input field.' }
    
    if(!inputs.email) { errors.mail = '❌ Type an email' }
    else if(!email_REGEX.test(inputs.email)) { errors.mail = '❌ E-mail invalid.' }

    if(!inputs.phone) { errors.phone = '❌ Type a number phone' }
    else if(!phone_REGEX.test(inputs.phone)) { errors.phone = '❌ number phone invalid.' }
    
    return errors;
   }