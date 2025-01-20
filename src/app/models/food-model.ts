export class FoodMODEL {
  image:string;
  title:string;
  description:string;
  category:string;
  price:string;
  product_ID:string;
  constructor(image:string,title:string,description:string,category:string,price:string,product_ID:string){
    this.image = image;
    this.title = title;
    this.category = category;
    this.description = description;
    this.price = price;
    this.product_ID = product_ID;
  }
}
