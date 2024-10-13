import { describe, expect, test, vi } from "vitest";
import { Barbers } from "../../domain/entities/Barbers";
import { BarberUseCase } from "../../domain/use-cases/BarberUseCase";
import { FakerBarberRepository } from "./mocks/FakerBaberRepository";

describe("BARBER USECASE", () => {
  const fakerBarberRepository = new FakerBarberRepository();
  const sut = new BarberUseCase(fakerBarberRepository);
  const barberMock = new Barbers(
    "123123",
    "teste@gmail.com",
    "Alan",
    "Disponível",
    {
      banner: "http://foto.com",
      descricao: "Sou barbeiros a mais de 21 anos ...",
      foto: "http://logo.com.br",
      portfolio: [
        "http://img1.com",
        "http://img2.com",
        "http://img3.com",
        "http://img4.com",
        "http://img5.com",
      ],
    }
  );

  describe("GETBARBER FEATURE", () => {
    test("Must return 200 statusCode if barber exist", async () => {
      const barber = await sut.getBarber("123123");
      expect(barber.statusCode).toBe(200);
      expect(barber.data.barber?.nome).toEqual("Alan");
      expect(barber.data.error).toBeFalsy();
    });

    test("Must return 400 statusCode if the ID not send", async () => {
      const barber = await sut.getBarber("");
      expect(barber.statusCode).toBe(400);
      expect(barber.data.error).toBeTruthy();
    });

    test("Must return 404 statusCode if the BARBER is not found", async () => {
      const barber = await sut.getBarber("1");
      expect(barber.statusCode).toBe(404);
      expect(barber.data.error).toBeTruthy();
    });

    test("Must return 400 statusCode if an Error occur", async () => {
      vi.spyOn(fakerBarberRepository, "getBarber").mockImplementation(
        async () => ({
          error: true,
          message: "Ocorreu um erro ",
          barber: barberMock,
        })
      );

      const barber = await sut.getBarber("123123");
      expect(barber.statusCode).toBe(400);
      expect(barber.data.error).toBeTruthy();
    });
  });

  describe("GETALLSCHEDULES FEATURE", () => {
    test("Must return 200 statusCode and all SCHEDULES of the BARBER", async () => {
      const schedules = await sut.getAllSchedules(
        "123123",
        "09/10/2024 - 09:30:00"
      );
      expect(schedules.statusCode).toBe(200);
      expect(schedules.data.schedules).toBeTruthy();
    });

    test("Must return 400 statusCode if the ID is not provided", async () => {
      const schedules = await sut.getAllSchedules("", "09/10/2024 - 09:30:00");
      expect(schedules.statusCode).toBe(400);
      expect(schedules.data.error).toBeTruthy();
      expect(schedules.data.message).toEqual("ID and DATA is required");
    });

    test("Must return 400 statusCode if the DATA is not provided", async () => {
      const schedules = await sut.getAllSchedules("123123", "");
      expect(schedules.statusCode).toBe(400);
      expect(schedules.data.error).toBeTruthy();
      expect(schedules.data.message).toEqual("ID and DATA is required");
    });

    test("Must return 404 statusCode if the SCHEDULES not found", async () => {
      const schedules = await sut.getAllSchedules(
        "14141415125162",
        "09/10/2024 - 09:30:00"
      );
      expect(schedules.statusCode).toBe(404);
      expect(schedules.data.error).toBeTruthy();
    });

    test("Must return 400 statusCode if occur an error", async () => {
      vi.spyOn(fakerBarberRepository, "getAllSchedules").mockImplementation(
        async () => ({
          error: true,
          message: "Occur an error",
        })
      );
      const schedules = await sut.getAllSchedules(
        "14141415125162",
        "09/10/2024 - 09:30:00"
      );
      expect(schedules.statusCode).toBe(404);
      expect(schedules.data.error).toBeTruthy();
    });
  });

  describe("GETREQUESTS FEATURE", () => {
    test("Must return 200 statusCode and all Request to the user", async () => {
      const requests = await sut.getAllRequests("14141415125162");
      expect(requests.statusCode).toBe(200);
      expect(requests.data.error).toBeFalsy();
      expect(requests.data.clientRequests).toBeTruthy();
    });

    test("Must return 400 statusCode if ID is not provided", async () => {
      const requests = await sut.getAllRequests("");
      expect(requests.statusCode).toBe(400);
      expect(requests.data.message).toEqual("ID is required");
      expect(requests.data.error).toBeTruthy();
    });

    test("Must return 400 statusCode if Requests not found", async () => {
      const requests = await sut.getAllRequests("123123");
      expect(requests.statusCode).toBe(400);
      expect(requests.data.error).toBeTruthy();
    });

    test("Must return 400 statusCode if occur an error", async () => {
      vi.spyOn(fakerBarberRepository, "getRequests").mockImplementation(async () => (
        {
          error: true,
          message: "Occur an error"
        }
      ));
      const requests = await sut.getAllRequests("123123");
      expect(requests.statusCode).toBe(400);
      expect(requests.data.error).toBeTruthy();
    });
  });
});
