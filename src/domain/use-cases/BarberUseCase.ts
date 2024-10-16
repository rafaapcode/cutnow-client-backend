import { Barbers } from "../entities/Barbers";
import { BarbersRepository } from "../interfaces/BarbersRepository";

export type GetBarberResponse = {
  statusCode: number;
  data: {
    error: boolean;
    message: string;
    barber?: Barbers;
  };
};

export class BarberUseCase {
  constructor(private barberRepository: BarbersRepository) {}

  async getBarber(id: string): Promise<GetBarberResponse> {
    try {
      if (!id) {
        return {
          data: {
            error: true,
            message: "Id é obrigatório",
          },
          statusCode: 400,
        };
      }

      const { error, message, barber } = await this.barberRepository.getBarber(
        id
      );

      if (error && !barber) {
        return {
          statusCode: 404,
          data: {
            error: true,
            message,
          },
        };
      }

      if (error) {
        return {
          statusCode: 400,
          data: {
            error,
            message,
          },
        };
      }

      return {
        statusCode: 200,
        data: {
          error: false,
          message: "Barber retrieve",
          barber,
        },
      };
    } catch (error: any) {
      console.log("Error getBarber Method | Barber UseCase", error.message);
      return {
        statusCode: 500,
        data: {
          error: error.message,
          message: "Err interno tente novamente",
        },
      };
    }
  }
}
