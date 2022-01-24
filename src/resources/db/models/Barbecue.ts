import { Schema, model } from "mongoose";


interface IPeoples {
  name: string,
  drink: boolean,
  amountToPay: number;
  confirm: boolean,
}

interface ISchemaBarbecue {
  id: string,
  reason: string,
  date: string,
  priceDrink: number,
  priceWithoutDrink: number,
  peoples: IPeoples[],
}

const barbecueSchema = new Schema<ISchemaBarbecue>({
  id: String,
  reason: String,
  date: String,
  priceDrink: Number,
  priceWithoutDrink: Number,
  peoples: [{
    _id: false,
    name: String,
    drink: Boolean,
    amountToPay: Number,
    confirm: Boolean,
  }]
})

const BarbecueModel = model<ISchemaBarbecue>('Barbecue', barbecueSchema)

export default BarbecueModel;