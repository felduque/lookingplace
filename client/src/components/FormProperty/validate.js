//Validación de Formulario
export default function validateForm(inputs) {
    let errors = { };
    console.log('Validator ;) ', inputs);
    const title_REGEX = /^[a-zA-Z\s]+$/;
  
    if(inputs.title.length < 10) { errors.title = 'Usa palabras que hagan refencia a tu Place' }
    else if(inputs.title.length > 40) { errors.title = 'Sé breve' }
    else if(!title_REGEX.test(inputs.title)) { errors.title = 'Sólo se aceptan letras' }

    if(inputs.description.length < 30) { errors.description = 'Sé descriptivo con tu Place' }
    else if(inputs.description.length > 250) { errors.description = 'Sé breve en tu descripción' }

    if(inputs.checkIn === inputs.checkOut) { errors.checksTime = 'Error de espacio-tiempo' }
    
    if(inputs.capacity < 1) { errors.title = '¡Imposible!' }
    else if(inputs.capacity > 20) { errors.title = 'No puede ser mayor a 20' }

    if(inputs.beds < 1) { errors.beds = '¡Imposible!' }
    else if(inputs.beds > 20) { errors.beds = 'No puede ser mayor a 20' }

    if(inputs.baths < 1) { errors.baths = '¡Imposible!' }
    else if(inputs.baths > 20) { errors.baths = 'No puede ser mayor a 20' }

    if(inputs.services.length === 0) { errors.services = 'Ofrece algún servicio a los aventureros' }

    if(inputs.price < 1) { errors.price = 'Ponle un precio a tu Place' }

    if(inputs.lat === 0) { errors.geolocation = 'En dónde se encuentra' }
    
    
    return errors;
   }