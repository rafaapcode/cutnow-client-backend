import { describe, expect, test } from "vitest";
import { BarbershopUseCase } from "../../domain/use-cases/BarbershopUseCase";
import { FakerBarbershopRepository } from "./mocks/FakerBabershopRepository";

describe("BARBERSHOP USECASE", () => {
  const fakerRepo = new FakerBarbershopRepository();
  const sut = new BarbershopUseCase(fakerRepo);

  describe("GET Barbershop FEAT", async () => {
    test("Must return 200, if barberhop exist", async () => {
      const barbershop = await sut.getBarbershop("123123");
      expect(barbershop.statusCode).toBe(200);
      expect(barbershop.data.error).toBeFalsy();
    });

    test("Must return 404, if barberhop not exist", async () => {
      const barbershop = await sut.getBarbershop("11111");
      expect(barbershop.statusCode).toBe(404);
      expect(barbershop.data.error).toBeTruthy();
    });

    test("Must return 400, if ID is not provided", async () => {
      const barbershop = await sut.getBarbershop("");
      expect(barbershop.statusCode).toBe(400);
      expect(barbershop.data.error).toBeTruthy();
    });
  });

  describe("GET Schedules FEAT", async () => {
    test("Must return 200 if SCHEDULES exist", async () => {
      const schedules = await sut.getAllSchedules("0002920", "10/11/2024 - 19:00");
      expect(schedules.statusCode).toBe(200);
      expect(schedules.data.error).toBeFalsy();
    });

    test("Must return 404 if SCHEDULES not exist", async () => {
      const schedules = await sut.getAllSchedules("123123", "10/11/2024 - 19:00");
      expect(schedules.statusCode).toBe(404);
      expect(schedules.data.error).toBeTruthy();
    });

    test("Must return 400 if ID is not provided", async () => {
      const schedules = await sut.getAllSchedules("", "10/11/2024 - 19:00");
      expect(schedules.statusCode).toBe(400);
      expect(schedules.data.error).toBeTruthy();
    });

    test("Must return 400 if DATA is not provided", async () => {
      const schedules = await sut.getAllSchedules("123123", "");
      expect(schedules.statusCode).toBe(400);
      expect(schedules.data.error).toBeTruthy();
    });
  });

  describe("GET barbers FEAT", async () => {
    test("Must return 200 if barbers exist", async () => {
      const barbers = await sut.getAllBarbers("4141511");
      expect(barbers.statusCode).toBe(200);
      expect(barbers.data.error).toBeFalsy();
    });

    test("Must return 404 if barbers not exist", async () => {
      const barbers = await sut.getAllBarbers("0002920");
      expect(barbers.statusCode).toBe(404);
      expect(barbers.data.error).toBeTruthy();
    });
    
    test("Must return 400 if ID is not provided", async () => {
      const barbers = await sut.getAllBarbers("");
      expect(barbers.statusCode).toBe(400);
      expect(barbers.data.error).toBeTruthy();
    });

  });

});