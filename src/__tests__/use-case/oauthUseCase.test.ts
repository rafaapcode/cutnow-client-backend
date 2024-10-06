import { describe, expect, test, vi } from "vitest";
import { User } from "../../domain/entities/User";
import { JwtUseCase } from "../../domain/use-cases/JwtUseCase";
import { OAuthUseCase } from "../../domain/use-cases/OAuthUseCase";
import { UserUseCase } from "../../domain/use-cases/UserUseCase";
import { FakerGoogleSignIn } from "./mocks/FakerGoogleSignIn";
import { FakerJwtToken } from "./mocks/FakerJwtToken";
import { FakerUserRepository } from "./mocks/FakerUserRepository";

describe("OatuhUseCase", () => {
  const fakerRepository = new FakerUserRepository();
  const userUseCase = new UserUseCase(fakerRepository);
  const fakerJwtToken = new FakerJwtToken();
  const fakerGoogleSign = new FakerGoogleSignIn();
  const jwtUseCase = new JwtUseCase(fakerJwtToken);
  const sut = new OAuthUseCase(fakerGoogleSign,userUseCase, jwtUseCase);

  test("Login User", async () => {
    const res = await sut.signIn("code123");
    expect(res.statusCode).toBe(200);
    expect(res.data.token).toBeTruthy();
  })

  test("Code is not send", async () => {
    const res = await sut.signIn("");
    expect(res.statusCode).toBe(403);
    expect(res.data.error).toBeTruthy();
    expect(res.data.message).toEqual("Code is required");
  })

  test("User no verified the eamil", async () => {
    fakerGoogleSign.googleDataUser.verified_email = false;
    const res = await sut.signIn("code123");
    expect(res.statusCode).toBe(400);
    expect(res.data.error).toBeTruthy();
    expect(res.data.message).toEqual('Por favor verifique sua conta com o GOOGLE');
  })

  test("Error with the OauthRepository return 500 StatusCode", async () => {
    const spy = vi.spyOn(fakerGoogleSign, "signIn");
    spy.mockImplementation(async () => {
      return {
        error: false,
        message: "Login",
        data: ""
      }
    })
    const res = await sut.signIn("code123");
    expect(res.statusCode).toBe(500);
    expect(res.data.message).toEqual("Ocorreu um erro ao buscar os dados");
  })
  
  test("Error with the OauthRepository return 400 StatusCode", async () => {
    const spy = vi.spyOn(fakerGoogleSign, "signIn");
    spy.mockImplementation(async () => {
      return {
        error: true,
        message: "Ocorreu um erro no login",
      }
    })
    const res = await sut.signIn("code123");
    expect(res.statusCode).toBe(400);
    expect(res.data.message).toEqual("Ocorreu um erro no login");
  })

  test("Should return 201 StatusCode when a new User is logged", async () => {
    const spy = vi.spyOn(userUseCase, "findByEmail");
    spy.mockImplementation(async () => {
      return {
        error: true,
        message: "usuário não existe",
      }
    })
    const spy2 = vi.spyOn(fakerGoogleSign, "signIn");
    spy2.mockImplementation(async () => {
      return {
        error: false,
        message: "new user",
        data: new User("rafael ap", "rafael", "ap", "rafa@gmail.com", "https://rafa.avatar.com")
      }
    })
    const res = await sut.signIn("code123");

    expect(res.statusCode).toBe(201);
    expect(res.data.message).toEqual("Usuário criado e autenticado com sucesso");
  })

  test("Should return 500 create a user failed", async () => {
    const spy = vi.spyOn(userUseCase, "create");
    spy.mockImplementation(async () => {
      return {
        error: true,
        message: "erro ao criar o usuário",
      }
    })
    const res = await sut.signIn("code123");
    expect(res.statusCode).toBe(500);
    expect(res.data.message).toEqual("Erro ao criar o usuário");
  })

});