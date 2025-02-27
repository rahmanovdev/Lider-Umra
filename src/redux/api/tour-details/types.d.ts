/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace Package {
  type DetailType =
    | 'FoodInfo'
    | 'Requirements'
    | 'Restrictions'
    | 'PlacesToVisit'
    | 'YouGet';

  interface Warning {
    id: number;
    title: string;
    description: string;
    image: string;
  }

  type GetWarningsResponse = Warning[];

  interface CategoryPackage {
    id: number;
    name: string;
  }

  interface PackageDetailImage {
    id: number;
    image: string | null;
    video_url: string | null;
    title: string | null;
  }

  interface PackageDetail {
    id: number;
    category: CategoryPackage;
    name: string;
    rich: string;
    image: string;
    video_url: string;
    detail_type: 'FoodInfo' | 'Requirements' | 'Restrictions' | 'PlacesToVisit' | 'YouGet';
    detail_type_display: string;
    package_detail_images: PackageDetailImage[];
  }

  interface FoodInfo {
    id: number;
    title: string;
    description: string;
    images: string[];
  }

  interface Place {
    id: number;
    title: string;
    description: string;
    shortDescription: string;
    images: string[]; // `image` ордуна `images` массив катары кошулду
  }

  interface Gift {
    id: number;
    title: string;
    description: string;
    shortDescription: string;
    image: string;
  }

  type GetPlacesResponse = Place[];
  type GetPackageDetailsResponse = PackageDetail[];
  type GetFoodInfoResponse = FoodInfo[];
  type GetGiftsResponse = Gift[];
}
