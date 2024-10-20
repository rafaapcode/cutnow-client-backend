import { Barbers } from "../entities/Barbers";
import { Barbershop, Barbershops } from "../entities/Barbershop";
import { BarbershopRepository } from "../interfaces/BarbershopRepository";

export type ResponseBase<T> = {
  statusCode: number;
  data: T;
};

export type GetAllBarbershops = {
  error: boolean;
  message: string;
  barbershops?: Barbershops[];
};

export type GetBarbershop = {
  error: boolean;
  message: string;
  barbershop?: Barbershop;
};

export type GetAllBarbers = {
  error: boolean;
  message: string;
  barbers?: Barbers[];
};

export type GetServicesType = {
  error: boolean;
  message: string;
  services?: { nomeService: string; preco: number }[];
};

export class BarbershopUseCase {
  constructor(private barbershopRepository: BarbershopRepository) {}

  async getAllBarbershops(): Promise<ResponseBase<GetAllBarbershops>> {
    try {
      const { error, message, statusCode, barbershop } =
        await this.barbershopRepository.getAllBarbershops();
      return {
        statusCode,
        data: {
          error,
          message,
          barbershops: barbershop,
        },
      };
    } catch (error: any) {
      console.log("Error getAllBarbershops Method | BarbershopUseCase ", error.message);
      return {
        statusCode: 500,
        data: {
          error: true,
          message: error.message,
        },
      };
    }
  }

  async getBarbershop(id: string): Promise<ResponseBase<GetBarbershop>> {
    try {
      if (!id || id.length < 12) {
        return {
          statusCode: 400,
          data: {
            error: true,
            message: "Id is required and must be a OBJECTID",
          },
        };
      }

      const { error, message, statusCode, barbershop } =
        await this.barbershopRepository.getBarbershop(id);

      return {
        statusCode,
        data: {
          error,
          message,
          barbershop,
        },
      };
    } catch (error: any) {
      console.log("Error getBarbershop Method | BarbershopUseCase ", error.message);
      return {
        statusCode: 500,
        data: {
          error: true,
          message: error.message,
        },
      };
    }
  }

  async getAllBarbers(id: string): Promise<ResponseBase<GetAllBarbers>> {
    try {
      if (!id || id.length < 12) {
        return {
          statusCode: 400,
          data: {
            error: true,
            message: "Id is required",
          },
        };
      }

      const { error, message, statusCode, barbers } =
        await this.barbershopRepository.getAllBarbers(id);

      return {
        statusCode,
        data: {
          error,
          message,
          barbers,
        },
      };
    } catch (error: any) {
      console.log("Error getAllBarbers Method | BarbershopUseCase ", error.message);
      return {
        statusCode: 500,
        data: {
          error: true,
          message: error.message,
        },
      };
    }
  }

  async getServicesType(id: string): Promise<ResponseBase<GetServicesType>> {
    try {
      if (!id) {
        return {
          statusCode: 400,
          data: {
            error: true,
            message: "Id is required",
          },
        };
      }
      const { error, message, statusCode, services } =
        await this.barbershopRepository.getServicesTypes(id);

      return {
        statusCode,
        data: {
          error,
          message,
          services,
        },
      };
    } catch (error: any) {
      console.log("Error getServicesType Method | BarbershopUseCase ", error.message);
      return {
        statusCode: 500,
        data: {
          error: true,
          message: error.message,
        },
      };
    }
  }
}
