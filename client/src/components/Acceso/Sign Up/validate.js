//Validación de Formulario
export default function validateForm(inputs) {
  let errors = {};
  const name_REGEX =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
  const password_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const email_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const phone_REGEX = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{1})/;

  if (inputs.fullName.length < 10) {
    errors.name = "Nombre demasiado corto";
  } else if (inputs.fullName.length > 35) {
    errors.name = "Nombre demasiado largo";
  } else if (!name_REGEX.test(inputs.fullName)) {
    errors.name =
      "De 10 a 35 caracteres. Puede incluir tildes si tu nombre lo contiene.";
  }

  if (!inputs.password) {
    errors.password = "Escribe una contraseña segura";
  } else if (!password_REGEX.test(inputs.password)) {
    errors.password =
      'De 8 a 24 caracteres. Incluyendo al menos una mayúscuyula, un número y un carater especial {"!,#,@,#,$,%"}';
  }

  if (!inputs.password2) {
    errors.password2 = "Repite la contraseña anterior";
  } else if (inputs.password !== inputs.password2) {
    errors.password2 = "Ambas contraseñas deben coicidir";
  }

  if (!inputs.email) {
    errors.mail = "Ingresa un correo";
  } else if (!email_REGEX.test(inputs.email)) {
    errors.mail = "El correo no es una dirección válida";
  }

  if (!inputs.phone) {
    errors.phone = "Ingresa tu número de teléfono";
  } else if (!phone_REGEX.test(inputs.phone)) {
    errors.phone = "El número no es un teléfono válido";
  }

  return errors;
}
