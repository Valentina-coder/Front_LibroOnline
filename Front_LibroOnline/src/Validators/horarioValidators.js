// =============================================================
// VALIDADORES DE HORARIO — horarioValidators.js
const FESTIVOS = new Set([
  // 2025
  '2025-01-01', '2025-04-18', '2025-04-19', '2025-05-01', '2025-05-21',
  '2025-06-20', '2025-07-16', '2025-08-15', '2025-09-18', '2025-09-19',
  '2025-10-13', '2025-10-31', '2025-11-01', '2025-12-08', '2025-12-25',
  // 2026
  '2026-01-01', '2026-04-03', '2026-04-04', '2026-05-01', '2026-05-21',
  '2026-06-19', '2026-07-16', '2026-08-17', '2026-09-18', '2026-09-19',
  '2026-10-12', '2026-10-31', '2026-11-02', '2026-12-08', '2026-12-25',
  // 2027
  '2027-01-01', '2027-03-26', '2027-03-27', '2027-05-01', '2027-05-21',
  '2027-06-21', '2027-07-16', '2027-08-16', '2027-09-18', '2027-09-19',
  '2027-10-11', '2027-10-31', '2027-11-01', '2027-12-08', '2027-12-25',
])

export function esFestivo(fechaStr) {
  return FESTIVOS.has(fechaStr)
}

export function esFinDeSemana(fechaStr) {
  const d = new Date(fechaStr + 'T12:00:00')
  const dia = d.getDay()
  return dia === 0 || dia === 6
}

export function esDiaNoLaboral(fechaStr) {
  return esFinDeSemana(fechaStr) || esFestivo(fechaStr)
}

// Horario hábil del centro
// Lunes–viernes: 07:00–21:00 | Sábado, domingo, festivos: 09:00–16:00
export function getHorarioCentro(fechaStr) {
  if (!fechaStr) return { inicio: '07:00', fin: '21:00' }
  if (esDiaNoLaboral(fechaStr)) return { inicio: '09:00', fin: '16:00' }
  return { inicio: '07:00', fin: '21:00' }
}

export function horaAMinutos(hora) {
  const [h, m] = hora.split(':').map(Number)
  return h * 60 + m
}

export function minutosAHora(totalMin) {
  const h = Math.floor(totalMin / 60)
  const m = totalMin % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function calcularHoraFin(horaInicio, duracionMinutos) {
  return minutosAHora(horaAMinutos(horaInicio) + Number(duracionMinutos))
}

// Valida que un bloque quepa dentro del horario hábil del centro
export function validarBloque(fechaStr, horaInicio, duracionMinutos) {
  if (!fechaStr || !horaInicio || !duracionMinutos) {
    return { valido: false, mensaje: 'Completa todos los campos' }
  }
  const dur = Number(duracionMinutos)
  if (!dur || dur <= 0) return { valido: false, mensaje: 'La duración debe ser mayor a 0' }

  const { inicio: apertura, fin: cierre } = getHorarioCentro(fechaStr)
  const inicioMin  = horaAMinutos(horaInicio)
  const apertMin   = horaAMinutos(apertura)
  const cierreMin  = horaAMinutos(cierre)
  const finMin     = inicioMin + dur

  if (inicioMin < apertMin) {
    return { valido: false, mensaje: `El centro abre a las ${apertura} este día` }
  }
  if (inicioMin >= cierreMin) {
    return { valido: false, mensaje: `El horario de inicio debe ser antes de las ${cierre}` }
  }
  if (finMin > cierreMin) {
    return {
      valido: false,
      mensaje: `El bloque terminaría a las ${minutosAHora(finMin)}, pero el centro cierra a las ${cierre}`,
    }
  }
  return { valido: true, mensaje: '' }
}

// Genera opciones de hora cada 15 min dentro del horario hábil del día
// Si se pasa duracionMinutos, garantiza que haya espacio para el bloque completo
export function generarHorasDisponibles(fechaStr, duracionMinutos = 15) {
  const today = new Date().toISOString().slice(0, 10)
  const { inicio, fin } = getHorarioCentro(fechaStr || today)
  const aperturaMin = horaAMinutos(inicio)
  const cierreMin   = horaAMinutos(fin)
  const dur         = Number(duracionMinutos) || 15
  const horas       = []
  for (let m = aperturaMin; m + dur <= cierreMin; m += 15) {
    horas.push(minutosAHora(m))
  }
  return horas
}

// Calcula cuántos slots caben en un rango horario dado una duración
export function slotsEnRango(horaInicio, horaFin, duracionMinutos) {
  if (!horaInicio || !horaFin || !duracionMinutos) return 0
  const inicioMin = horaAMinutos(horaInicio)
  const finMin    = horaAMinutos(horaFin)
  const dur       = Number(duracionMinutos)
  if (finMin <= inicioMin || dur <= 0) return 0
  return Math.floor((finMin - inicioMin) / dur)
}

// Genera opciones de "Hasta" a partir de una hora de inicio dado, en pasos de 15 min
export function generarHorasHasta(fechaStr, horaDesde, duracionMinutos) {
  if (!fechaStr || !horaDesde || !duracionMinutos) return []
  const { fin } = getHorarioCentro(fechaStr)
  const cierreMin = horaAMinutos(fin)
  const desdeMin  = horaAMinutos(horaDesde)
  const dur       = Number(duracionMinutos)
  if (!dur || dur <= 0) return []
  const horas = []
  for (let m = desdeMin + dur; m <= cierreMin; m += 15) {
    horas.push(minutosAHora(m))
  }
  return horas
}

// Genera la lista de slots { inicio, fin } para un rango dado
export function generarSlots(horaDesde, horaHasta, duracionMinutos) {
  if (!horaDesde || !horaHasta || !duracionMinutos) return []
  const dur     = Number(duracionMinutos)
  if (!dur || dur <= 0) return []
  const hastaMin = horaAMinutos(horaHasta)
  const slots    = []
  let start      = horaAMinutos(horaDesde)
  while (start + dur <= hastaMin) {
    slots.push({ inicio: minutosAHora(start), fin: minutosAHora(start + dur) })
    start += dur
  }
  return slots
}

// Valida el rango completo para el modo lote
export function validarRangoLote(fechaStr, horaInicioRango, horaFinRango, duracionMinutos) {
  const validInicio = validarBloque(fechaStr, horaInicioRango, duracionMinutos)
  if (!validInicio.valido) return validInicio

  const { fin: cierre } = getHorarioCentro(fechaStr)
  const finRangoMin  = horaAMinutos(horaFinRango)
  const cierreMin    = horaAMinutos(cierre)
  const inicioMin    = horaAMinutos(horaInicioRango)

  if (finRangoMin > cierreMin) {
    return { valido: false, mensaje: `El rango termina más allá del cierre (${cierre})` }
  }
  if (finRangoMin <= inicioMin) {
    return { valido: false, mensaje: 'La hora de fin debe ser posterior a la de inicio' }
  }
  const slots = slotsEnRango(horaInicioRango, horaFinRango, duracionMinutos)
  if (slots === 0) {
    return { valido: false, mensaje: 'El rango es demasiado corto para al menos un slot' }
  }
  return { valido: true, mensaje: '' }
}
