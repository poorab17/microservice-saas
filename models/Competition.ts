//models/Competition
import { format } from "date-fns";

class Competition {
  id!: number;
  category!: string;
  name!: string;
  code!: string;
  place!: string;
  fromDate!: string;
  toDate!: string;
  conductedBy!: string;
  createdAt: Date;

  constructor(
    id: number,
    category: string,
    name: string,
    code: string,
    place: string,
    fromDate: string,
    toDate: string,
    conductedBy: string,
    createdAt: Date
  ) {
    this.id = id;
    this.category = category;
    this.name = name;
    this.code = code;
    this.place = place;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.conductedBy = conductedBy;
    this.createdAt = createdAt;
  }
}

export { Competition };
