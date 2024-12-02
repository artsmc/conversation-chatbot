// services/auth.service.ts
import api from './api';

const currentCall = (vapi_call_id:string) => {
  return api.get(`/conversation/vapi/current-call?vapi_call_id=${vapi_call_id}&time=${new Date().getTime()}`);
};
const conversationService = {
  currentCall,
  // other methods...
};

export default conversationService;
