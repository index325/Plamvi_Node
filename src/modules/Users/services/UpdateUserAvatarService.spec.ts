import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashprovider from "@shared/container/providers/HashProvider/fakes/FakeHashProvider";
import FakeStorageprovider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";

import CreateUserService from "./CreateUserService";
import UpdateUserAvatarService from "./UpdateUserAvatarService";
import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashprovider: FakeHashprovider;
let fakeStorageProvider: FakeStorageprovider;
let updateUserAvatar: UpdateUserAvatarService;

describe("UpdateUserAvatar", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashprovider = new FakeHashprovider();
    fakeStorageProvider = new FakeStorageprovider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );
  });

  it("should be able to update an user`s avatar", async () => {
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashprovider
    );

    const user = await createUser.execute({
      avatar: "fake.jpg",
      city: "Belém",
      state: "PA",
      name: "Junin",
      email: "junin@example.com",
      password: "123456",
    });

    const foundUser = await updateUserAvatar.execute({
      avatar: "updated.jpg",
      user_id: user.id,
    });

    expect(foundUser.avatar).toBe("updated.jpg");
  });

  it("should not be able to update a non existing user`s avatar", async () => {
    await expect(
      updateUserAvatar.execute({
        avatar: "fake.jpg",
        user_id: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
