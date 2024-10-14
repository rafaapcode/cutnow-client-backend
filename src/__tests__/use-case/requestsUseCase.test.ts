import { describe, expect, test } from "vitest";
import { NewRequest } from "../../domain/entities/Requests";
import { RequestUseCase } from "../../domain/use-cases/RequestsUseCase";
import { RequestValidator } from "../../infraestructure/validators/RequestsValidator";
import { FakerRequestRepository } from "./mocks/FakerRequestRepository";

describe("Request UseCase", () => {
  const fakerRequestRepo = new FakerRequestRepository();
  const validator = new RequestValidator();
  const sut = new RequestUseCase(fakerRequestRepo, validator);
  describe("CREATE REQUEST FEAT", () => {
    test("Must return 201 status code when request is create", async () => {
      const result = await sut.create(new NewRequest("Cabelo", "Joaquim", "09-09-2024 - 18:30", "alan.turing@gmail.com", "qweasdzxccxzdsaewq12345678", "qweasdzxccxzdsaewq12345678"));
      expect(result.statusCode).toBe(201);
      expect(result.error).toBeFalsy();
    }); 

    test("Must return 406 if the serviceType have less than 4 characters", async () => {
      const result = await sut.create(new NewRequest("Cab", "Joaquim", "09-09-2024 - 18:30", "alan.turing@gmail.com", "qweasdzxccxzdsaewq12345678", "qweasdzxccxzdsaewq12345678"));
      expect(result.statusCode).toBe(406);
      expect(result.error).toBeTruthy();
    });

    test("Must return 406 if the clientName have less than 3 characters", async () => {
      const result = await sut.create(new NewRequest("Cabelo", "Ta", "09-09-2024 - 18:30", "alan.turing@gmail.com", "qweasdzxccxzdsaewq12345678", "qweasdzxccxzdsaewq12345678"));
      expect(result.statusCode).toBe(406);
      expect(result.error).toBeTruthy();
    });

    test("Must return 406 if the DATE is in incorret format", async () => {
      const result = await sut.create(new NewRequest("Cabelo", "Joaquim", "09-09-2024", "alan.turing@gmail.com", "qweasdzxccxzdsaewq12345678", "qweasdzxccxzdsaewq12345678"));
      expect(result.statusCode).toBe(406);
      expect(result.error).toBeTruthy();
    });

    test("Must return 406 if the EMAIL is invalid", async () => {
      const result = await sut.create(new NewRequest("Cabelo", "Joaquim", "09-09-2024 - 18:30", "alan.turing", "qweasdzxccxzdsaewq12345678", "qweasdzxccxzdsaewq12345678"));
      expect(result.statusCode).toBe(406);
      expect(result.error).toBeTruthy();
    });

    test("Must return 406 if the barbearia_id has less than 24 characters", async () => {
      const result = await sut.create(new NewRequest("Cabelo", "Joaquim", "09-09-2024 - 18:30", "alan.turing@gmail.com", "qweasdzxccxzdsaewq", "qweasdzxccxzdsaewq12345678"));
      expect(result.statusCode).toBe(406);
      expect(result.error).toBeTruthy();
    });

    test("Must return 406 if the barbeiro_id has less than 24 characters", async () => {
      const result = await sut.create(new NewRequest("Cabelo", "Joaquim", "09-09-2024 - 18:30", "alan.turing@gmail.com", "qweasdzxccxzdsaewq12345678", "qweasdzxccxzdsaewq"));
      expect(result.statusCode).toBe(406);
      expect(result.error).toBeTruthy();
    });
  });

  describe("DELETE REQUEST FEAT", () => {
    test("Must return 406 if the id is not provided", async () => {
      const result = await sut.delete("");
      expect(result.statusCode).toBe(406);
      expect(result.error).toBeTruthy();
    });

    test("Must return 404 if the request not exist", async () => {
      const result = await sut.delete("507f191e810c19729de861op");
      expect(result.statusCode).toBe(404);
      expect(result.error).toBeTruthy();
    });

    test("Must return 200 if delete the request with success", async () => {
      const result = await sut.delete("507f191e810c19729de860ea");
      expect(result.statusCode).toBe(200);
      expect(result.error).toBeFalsy();
    });
  });
});