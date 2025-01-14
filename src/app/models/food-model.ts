export class FoodMODEL {
  image:string;
  title:string;
  description:string;
  category:string;
  price:string;
  constructor(image:string,title:string,description:string,category:string,price:string){
    this.image = image;
    this.title = title;
    this.category = category;
    this.description = description;
    this.price = price;
  }
}
