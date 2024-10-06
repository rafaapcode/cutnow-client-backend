import { describe, expect, test } from "vitest";
import { User } from "../../domain/entities/User";

describe("UserUseCase", () => {
  const user = new User("John Doe", "John", "Doe", "jogndoe@gmail.com", "https://johnavatar.doe.com");

  test("Must Create a new User", () => {
    // const userRepositoryStub: UserRepository = {
      
    // }

    expect(3).toBe(3);
  });
});
