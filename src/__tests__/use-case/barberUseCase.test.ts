import { describe, expect, test, vi } from "vitest";
import { Barbers } from "../../domain/entities/Barbers";
import { BarberUseCase } from "../../domain/use-cases/BarberUseCase";
import { FakerBarberRepository } from "./mocks/FakerBaberRepository";

describe("BARBER USECASE", () => {
  const fakerBarberRepository = new FakerBarberRepository();
  const sut = new BarberUseCase(fakerBarberRepository);
  const barberMock = new Barbers("123123", "teste@gmail.com", "Alan", "Disponível", {
    banner: "http://foto.com",
    descricao: "Sou barbeiros a mais de 21 anos ...",
    foto: "http://logo.com.br",
    portfolio: [
      "http://img1.com",
      "http://img2.com",
      "http://img3.com",
      "http://img4.com",
      "http://img5.com"
    ]
  })

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
      expect(barber.data.error).toBeTruthy()
    });

    test("Must return 404 statusCode if the BARBER is not found", async () => {
      const barber = await sut.getBarber("1");
      expect(barber.statusCode).toBe(404);
      expect(barber.data.error).toBeTruthy();
    });

    test("Must return 400 statusCode if an Error occur", async () => {
      vi.spyOn(fakerBarberRepository, "getBarber").mockImplementation(async () => ({
        error: true,
        message: "Ocorreu um erro ",
        barber:  barberMock,
      }));

      const barber = await sut.getBarber("123123");
      expect(barber.statusCode).toBe(400);
      expect(barber.data.error).toBeTruthy();
    });
  });
});
