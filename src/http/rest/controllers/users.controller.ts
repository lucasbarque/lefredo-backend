import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/http/rest/inputs/create-user-input';
import { User } from 'src/http/rest/models/user';

import { UsersService } from '@services/users.service';

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
