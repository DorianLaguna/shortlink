import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Link extends Document {

    @Prop({
        unique:true,
        index: true,
    })
    url: string;

    @Prop({
        index: true,
        unique:true,
    })
    redirect: string;

    @Prop({
        index: true,
    })
    times_use: number;

}

export const LinkSchema = SchemaFactory.createForClass( Link );