import { logger } from "../../infraestructure/logger";
import { Barbers } from "../entities/Barbers";
import { Requests } from "../entities/Requests";
import { SchedulesToBarber } from "../entities/Schedules";
import { BarbersRepository } from "../interfaces/BarbersRepository";

export type GetBarberResponse = {
  statusCode: number;
  data: {
    error: boolean;
    message: string;
    barber?: Barbers;
  };
};

export type GetSchedulesResponse = {
  statusCode: number;
  data: {
    error: boolean;
    message: string;
    schedules?: SchedulesToBarber[];
  };
};

export type GetRequestsResponse = {
  statusCode: number;
  data: {
    error: boolean;
    message: string;
    clientRequests?: Requests[];
  };
};

export class BarberUseCase {
  constructor(private barberRepository: BarbersRepository) {}

  async getBarber(id: string): Promise<GetBarberResponse> {
    try {
      if (!id) {
        logger.warn("Id não enviado");
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
        logger.error(message);
        return {
          statusCode: 404,
          data: {
            error: true,
            message,
          },
        };
      }

      if (error) {
        logger.error(message);
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
      logger.error(error.message);
      return {
        statusCode: 500,
        data: {
          error: error.message,
          message: "Err interno tente novamente",
        },
      };
    }
  }

  async getAllSchedules(
    id: string,
    data: string
  ): Promise<GetSchedulesResponse> {
    try {
      if (!id || !data) {
        logger.warn("Id e data não fornecidos");
        return {
          data: {
            error: true,
            message: "ID and DATA is required",
          },
          statusCode: 400,
        };
      }

      const { error, message, schedules } =
        await this.barberRepository.getAllSchedules(id, data);

      if (error && !schedules) {
        logger.error(message);
        return {
          statusCode: 404,
          data: {
            error: true,
            message,
          },
        };
      }

      if (error) {
        logger.error(message);
        return {
          statusCode: 400,
          data: {
            error: true,
            message,
          },
        };
      }

      return {
        statusCode: 200,
        data: {
          error: false,
          message,
          schedules,
        },
      };
    } catch (error: any) {
      logger.error(error.message);
      return {
        statusCode: 500,
        data: {
          error: true,
          message: error.message,
        },
      };
    }
  }

  async getAllRequests(id: string): Promise<GetRequestsResponse> {
    try {
      if (!id) {
        logger.warn("Id não fornecido");
        return {
          statusCode: 400,
          data: {
            error: true,
            message: "ID is required",
          },
        };
      }

      const { error, message, clientRequests } =
        await this.barberRepository.getRequests(id);

      if (error) {
        logger.error(message);
        return {
          statusCode: 400,
          data: {
            error,
            message,
          },
        };
      }

      if (!clientRequests) {
        logger.error("Sem solicitações encontradas");
        return {
          statusCode: 404,
          data: {
            error,
            message,
            clientRequests: undefined,
          },
        };
      }

      return {
        statusCode: 200,
        data: {
          error: false,
          message,
          clientRequests,
        },
      };
    } catch (error: any) {
      logger.error(error.message);
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
