export const ApiNames = {
  getHealthStatus: '/api/Heartbeatz/GetHealthStatus',
  getPatients: '/api/Patient/search',
  getPatientDetails: '/api/Patient/GetFullPatientById/',
  getUserMicrosoftImage: '/photo/$value',
  deletePatient: '/api/Patient/',
  postPatient: '/api/Patient/create',
  //transcript
  generateIntakeNotes: '/api/Transcript/generateIntakeSoapNotes',
  generateIntakeDocuments: '/api/Transcript/createIntakeDocuments',
  generateConsultantNotes: '/api/Transcript/generateConsultationSoapNotes',
  generateConsultantDocuments: '/api/Transcript/createConsultationDocuments',
  //user
  getUserProfile: '/api/User/profile',
};
