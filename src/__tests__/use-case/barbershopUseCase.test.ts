import { describe, expect, test } from "vitest";
import { BarbershopUseCase } from "../../domain/use-cases/BarbershopUseCase";
import { FakerBarbershopRepository } from "./mocks/FakerBabershopRepository";

describe("BARBERSHOP USECASE", () => {
  const fakerRepo = new FakerBarbershopRepository();
  const sut = new BarbershopUseCase(fakerRepo);

  describe("GET Barbershop FEAT",  () => {
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

  describe("GET barbers FEAT",  () => {
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

  describe("GET SERVICES FEAT",  () => {
    test("Must return 200 if the services exists", async  () => {
      const services = await sut.getServicesType("123123");
      expect(services.statusCode).toBe(200);
      expect(services.data.error).toBeFalsy();
    });

    test("Must return 404 if the services not exists", async  () => {
      const services = await sut.getServicesType("4141511");
      expect(services.statusCode).toBe(404);
      expect(services.data.error).toBeTruthy();
    });

    test("Must return 400 if ID is not provided", async  () => {
      const services = await sut.getServicesType("");
      expect(services.statusCode).toBe(400);
      expect(services.data.error).toBeTruthy();
    });
  });
});