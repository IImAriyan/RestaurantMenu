export class CategoryMODEL {
  title:string;
  category:string;
  image:string;
  constructor(title:string = "", category:string = "", image:string= "") {
    this.title = title;
    this.category = category;
    this.image = image;
  }
}
