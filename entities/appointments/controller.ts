import {Appointment, IAppointment} from "./model.js";



// Crear nueva cita
export const createAppointment = async (data: IAppointment, token) => {
  // ToDo: cambiar return por lanzar excepciones
  if (!data || !data.start || !data.end || !data.doctor || !data.client) return null
  if (data.doctor !== token.id && data.client !== token.id) return null;
  const start = new Date(data.start);
  const end = new Date(data.end)
  const overlap = await listAppointments(data.start, data.end, token.id);
  if (overlap.length) throw new Error("DUPLICATED_DATE");
  return Appointment.create(data);
};

// Sacar lista de citas que incluyen la id del usuario como cliente o doctor, en un intervalo de tiempo (por defecto infinito)
export const listAppointments = async (start?: string, end?: string, id?: string) => {
  const filter: any = {}
  if (id) filter.$or = [{ client: id }, { doctor: id }];
  if (start && !end) filter.end = { $gte: start }
  if (end && !start) filter.start = { $lte: end }
  if (start && end) {
    filter.start = [{ $gte: start}, { $lte: end}]
    filter.end = [{ $gte: start }, { $lte: end }]
  }
  filter.active = true
  return Appointment.find(filter);
}

export const updateAppointment = async (appID, data, token) => {
  const appointment = await Appointment.findOne({id: appID})
  const updatedValues = (({start, end, doctor}) => ({start, end, doctor}))(data)
  const overlap = await listAppointments(data.start, data.end, data.id)
  if (token.id !== (appointment?.client || appointment?.doctor) && token.role !== 'ADMIN') return null
  if (overlap.length) return null  
  return Appointment.updateOne(appID, updatedValues)
}

export const deleteAppointment = async (appID, token) => {
  const appointment = await Appointment.findOne({id: appID})
  if (token.id !== appointment?.client && token.role !== 'ADMIN') return null
  return Appointment.updateOne(appID, {active: false})
}



