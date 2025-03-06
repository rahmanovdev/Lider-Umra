export namespace HOTEL {
   export interface IHotelImage {
      id: number;
      image: string;
      hotel: number;
   }

   export interface IHotelVideo {
      id: number;
      image: string;
      hotel: number;
   }

   export interface IHotel {
      id: number;
      category: {
         id: number;
         name: string;
      };
      name: string;
      city: string;
      city_display: string;
      stars: number;
      stars_display: string;
      image?: string;
      distance_to_mosque: string;
      accommodation: string;
      meals: string;
      nights: number;
      hotel_images?: IHotelImage[];
      hotel_videos?: IHotelVideo[];
   }

   export type GetHotelsResponse = IHotel[];
}
