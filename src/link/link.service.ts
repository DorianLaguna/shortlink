import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Link } from './entities/link.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LinkService {

  constructor(
    @InjectModel( Link.name )
    private readonly linkModel: Model<Link>
  ){}

  async create(createLinkDto: CreateLinkDto) {

    const redirect = await this.findOneByRedirect(createLinkDto.redirect);

    if(redirect) throw new BadRequestException(`Shortlink ya existe para este link.`);

    const nanoid = uuid().slice(0, 8);
    const url = "http://localhost:3000/link/" + nanoid;
    await this.linkModel.create({
      url: nanoid,
      redirect: createLinkDto.redirect,
      times_use: 0
    });

    return url;
  }

  findAll() {
    return this.linkModel.find()
      .select('-__v');
  }


  async findOne(url: string): Promise<string> {
    const link = await this.linkModel.findOne({url});
    console.log(url);

    if( !link )
      throw new NotFoundException("No se encontro ninguna url");

    link.times_use++;
    await link.save();

    return link.redirect;
  }

  async findOneByRedirect(url: string) {
    return await this.linkModel.findOne({redirect: url});
  }

  update(id: string, updateLinkDto: UpdateLinkDto) {
    return `This action updates a #${id} link`;
  }

  remove(id: string) {
    return `This action removes a #${id} link`;
  }

  getNumber(){

  }
}
