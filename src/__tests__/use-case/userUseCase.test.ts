import { describe, expect, test } from "vitest";
import { User } from "../../domain/entities/User";
import { UserUseCase } from "../../domain/use-cases/UserUseCase";
import { FakerUserRepository } from "./mocks/FakerUserRepository";
describe("UserUseCase", () => {
  const newUser = new User(
    "Alan Turing",
    "Alan",
    "Turing",
    "alanTuring@tech.com",
    "https://alan.turing.com"
  );
  const fakerRepository = new FakerUserRepository();
  const sut = new UserUseCase(fakerRepository);

  describe("CREATE FEATURE", () => {
    test("Must Create a new User", async () => {
      const mockUser = await sut.create(newUser);
      expect(mockUser.error).toBeFalsy();
    });

    test("Must return a error true if the user already exist", async () => {
      const mockUser = await sut.create(newUser);
      expect(mockUser.error).toBeTruthy();
    });
  });

  describe("UPDATE-CPF FEATURE", () => {
    test("Must return a 200 StatusCode when update CPF was successfully", async () => {
      const mockUser = await sut.updateCpf(newUser.email, "123456");
      expect(mockUser.statusCode).toBe(200);
    });

    test("Must return a 400 StatusCode when the user DONT exist", async () => {
      const mockUser = await sut.updateCpf("johndoe@gmail.com", "123");
      expect(mockUser.statusCode).toBe(400);
      expect(mockUser.data.message).toEqual("Usuário não existe");
    });

    test("Must return a 400 StatusCode if email is not passed", async () => {
      const mockUser = await sut.updateCpf("", "123");
      expect(mockUser.statusCode).toBe(400);
      expect(mockUser.data.message).toEqual("Email e CPF são obrigatórios.");
    });
    
    test("Must return a 400 StatusCode if cpf is not passed", async () => {
      const mockUser = await sut.updateCpf("johndoe@gmail.com", "");
      expect(mockUser.statusCode).toBe(400);
      expect(mockUser.data.message).toEqual("Email e CPF são obrigatórios.");
    });

    test("Must return a 400 StatusCode if cpf and email is not passed", async () => {
      const mockUser = await sut.updateCpf("", "");
      expect(mockUser.statusCode).toBe(400);
      expect(mockUser.data.message).toEqual("Email e CPF são obrigatórios.");
    });
  });
});
