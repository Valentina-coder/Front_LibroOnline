export const noSoloEspacios = (v) => !v || v.trim().length > 0 || 'No puede contener solo espacios'

export function reglasNombre({ requerido = false, mensaje = 'Obligatorio' } = {}) {
  return {
    ...(requerido ? { required: mensaje } : {}),
    maxLength: { value: 20, message: 'Máximo 20 caracteres' },
    validate: { noEspacios: noSoloEspacios }
  }
}

export const reglasEmail = {
  required: 'El email es obligatorio',
  maxLength: { value: 40, message: 'Máximo 40 caracteres' },
  pattern: {
    value: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9][a-zA-Z0-9.\-]*\.[a-zA-Z]{2,}$/,
    message: 'Ingresa un correo válido'
  }
}

// Contraseña estricta para registro y admin
export const reglasPasswordCrear = {
  required: 'La contraseña es obligatoria',
  minLength: { value: 12, message: 'Mínimo 12 caracteres' },
  maxLength: { value: 30, message: 'Máximo 30 caracteres' },
  validate: {
    sinEspacios:    (v) => !/\s/.test(v)            || 'No puede contener espacios',
    tieneMayuscula: (v) => /[A-Z]/.test(v)           || 'Debe incluir una mayúscula',
    tieneMinuscula: (v) => /[a-z]/.test(v)           || 'Debe incluir una minúscula',
    tieneNumero:    (v) => /[0-9]/.test(v)           || 'Debe incluir un número',
    tieneEspecial:  (v) => /[^a-zA-Z0-9\s]/.test(v) || 'Debe incluir un carácter especial',
  }
}

// Contraseña de login: solo required (no fuerza el formato nuevo)
export const reglasPasswordLogin = { required: 'La contraseña es obligatoria' }

// Para el campo "Confirmar contraseña", recibe el valor de watch('password')
export const reglasConfirmPassword = (password) => ({
  required: 'Confirma tu contraseña',
  validate: (v) => v === password || 'Las contraseñas no coinciden'
})