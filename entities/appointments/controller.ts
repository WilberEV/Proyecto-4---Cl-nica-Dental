import {Appointment, IAppointment} from "./model.js";



// Crear nueva cita
export const createAppointment = async (data: IAppointment, token) => {
// Validamos que la petición tenga la información necesaria, y el cliente la autorización.
  if (!data || !data.start || !data.end || !data.doctor || !data.client) throw new Error('MISSING_DATA');
  if (data.doctor !== token.id && data.client !== token.id) throw new Error('NOT_AUTHORIZED');
// Comprobamos que no hay citas para ese doctor en el horario solicitado
  const overlap = await listAppointments(data.start, data.end, data.doctor);
  if (overlap.length) throw new Error("DUPLICATED_DATE");
  return Appointment.create(data);
};

// Sacar lista de citas que incluyen opcionalmente la id del usuario o un intervalo de tiempo
export const listAppointments = async (start?: string, end?: string, id?: string) => {
// Creamos un filtro con los criterios opcionales
  const filter: any = {active: true}
  if (id) filter.$or = [{ client: id }, { doctor: id }];
  if (start && !end) filter.end = { $gte: start }
  if (end && !start) filter.start = { $lte: end }
  if (start && end) {
    filter.start = [{ $gte: start}, { $lte: end}]
    filter.end = [{ $gte: start }, { $lte: end }]
  }
  return Appointment.find(filter);
}


// Actualizar cita
export const updateAppointment = async (appID, data, token) => {
// Comprobamos si la cita a actualizar existe, y validamos la autorización del usuario.
  const appointment = await Appointment.findOne({id: appID})
  if (!appointment) throw new Error('NOT_FOUND')
  if ((token.id !== appointment.client || token.id !== appointment.doctor) && token.role !== 'ADMIN') throw new Error('NOT_AUTHORIZED')
// Desestructuramos la edición que nos han solicitado para descartar claves no deseadas
  const updatedValues = (({start, end, doctor}) => ({start, end, doctor}))(data)
// Comprobamos que la nueva versión de la cita no pise una cita ya existente en términos de doctor y fecha
  const overlap = await listAppointments(data.start, data.end, data.doctor)
  if (overlap.length) return null  
  return Appointment.findOneAndUpdate(appID, updatedValues, {new: true})
}


// Borrar cita
export const deleteAppointment = async (appID, token) => {
// Comprobamos que la cita a borrar existe, y el usuario tiene la autorización pertinente
  const appointment = await Appointment.findOne({id: appID})
  if (!appointment) throw new Error ('NOT_FOUND')
  if (token.id !== appointment.client && token.role !== 'ADMIN') throw new Error('NOT_AUTHORIZED')
  return Appointment.updateOne(appID, {active: false})
}