// interfaces/avatar.interface.ts
export interface Avatar {
    _id: string;
    name: string;
    e_name: string;
    skills?: string[];
    imageID: string;
    clean_name: string;
    phone_number: string;
    voice: string;
    token: string;
    face: string;
    created: string;
    is_active?: boolean;
    is_system?: boolean;
    vapi_id: string;
  }