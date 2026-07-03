export interface KontakPadukuhan {
  namaPadukuhan: string;
  alamat: string;
  telepon: string;
  whatsapp: string;
  email: string;
  maps: string;
  jamPelayanan: string;
  mediaSosial: {
    instagram?: string;
    facebook?: string;
  };
}
