import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UsersService } from '@services/users.service';

import { User } from '@models/user';

import { CreateUserInput } from '@inputs/create-user-input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  users() {
    return this.usersService.getAllUsers();
  }

  @Mutation(() => User)
  createUser(@Args('data') data: CreateUserInput) {
    return this.usersService.createUser(data);
  }
}
