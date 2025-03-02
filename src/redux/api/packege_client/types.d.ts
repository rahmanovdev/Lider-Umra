export namespace CLIENT {
  export interface CreateClientRequest {
    full_name: string;
    phone: string;
    country: string;
    city: string;
    package: number;
  }

  export interface CreateClientResponse {
    id: number;
    full_name: string;
    phone: string;
    country: string;
    city: string;
    package: number;
  }
}
