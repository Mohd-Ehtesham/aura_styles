export interface BannerImage {
  url: string;
  fileId: string;
}

export interface AdminSetting {
  _id: string;
  offerText: string;
  contactEmail: string;
  contactPhone: string;
  bannerImages: BannerImage[];
}

export interface AdminSettingApiResponse {
  success: boolean;
  message: string;
  length: number;
  data: AdminSetting[];
}
