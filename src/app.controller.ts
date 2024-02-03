/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import Axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/sub')
  async test() {
    try {
      const data = await Axios.get('https://yts.mx/api/v2/list_movies.json');
      const movies = data.data.data.movies;
      return movies;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  @Get('/query')
  async query(@Query('movie') movie: string) {
    try {
      const data = await Axios.get(
        `https://yts.mx/api/v2/list_movies.json?query_term=${movie}`,
      );
      const movies = data.data.data.movies;
      return movies;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  // @Get(':id')
  // findId(@Param('id') id: string) {
  //   // const data = testing.filter((x: any) => x.id === id);
  //   if (data) {
  //     return data;
  //   } else {
  //     return 'User not found!';
  //   }
  // }
}
