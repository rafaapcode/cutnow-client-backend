import { Barbers } from "../entities/Barbers";
import { Barbershop, Barbershops } from "../entities/Barbershop";
import { SchedulesToBarbershop } from "../entities/Schedules";
import { BarbershopRepository } from "../interfaces/BarbershopRepository";

export type GetAllBarbershopsResponse = {
  statusCode: number;
  data: {
    error: boolean;
    message: string;
    barbershops?: Barbershops[];
  };
};

export type GetBarbershopResponse = {
  statusCode: number;
  data: {
    error: boolean;
    message: string;
    barbershop?: Barbershop;
  };
};

export type GetAllSchedulearbershopResponse = {
  statusCode: number;
  data: {
    error: boolean;
    message: string;
    schedules?: SchedulesToBarbershop[];
  };
};

export type GetAllBarbersResponse = {
  statusCode: number;
  data: {
    error: boolean;
    message: string;
    barbers?: Barbers[];
  };
};

export class BarbershopUseCase {
  constructor(private barbershopRepository: BarbershopRepository) {}

  async getAllBarbershops(): Promise<GetAllBarbershopsResponse> {
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
      return {
        statusCode: 500,
        data: {
          error: true,
          message: error.message,
        },
      };
    }
  }

  async getBarbershop(id: string): Promise<GetBarbershopResponse> {
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
      return {
        statusCode: 500,
        data: {
          error: true,
          message: error.message,
        },
      };
    }
  }

  async getAllSchedules(
    id: string,
    date: string
  ): Promise<GetAllSchedulearbershopResponse> {
    try {
      if (!id || !date) {
        return {
          statusCode: 400,
          data: {
            error: true,
            message: "Id and Data is required",
          },
        };
      }

      const { error, message, statusCode, schedules } =
        await this.barbershopRepository.getAllSchedules(id, date);

      return {
        statusCode,
        data: {
          error,
          message,
          schedules,
        },
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        data: {
          error: true,
          message: error.message,
        },
      };
    }
  }

  async getAllBarbers(id: string): Promise<GetAllBarbersResponse> {
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

      const {error, message, statusCode, barbers} = await this.barbershopRepository.getAllBarbers(id);

      return {
        statusCode,
        data: {
          error,
          message,
          barbers
        }
      }
    } catch (error: any) {
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
