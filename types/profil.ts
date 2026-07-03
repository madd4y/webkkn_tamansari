export interface OrganizationMember {
  jabatan: string;
  nama: string;
}

export interface ProfilPadukuhan {
  id: string;
  sejarah: string;
  visi: string;
  misi: string[];
  geografis: string;
  luas: string;
  ketinggian: string;
  utara: string;
  selatan: string;
  timur: string;
  barat: string;
  maps: string;
  struktur: OrganizationMember[];
}
