import { Injectable } from '@angular/core';
import {CategoryMODEL} from "../models/category-model";
import {FoodMODEL} from "../models/food-model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categorys:CategoryMODEL[] = [
    {title:' همبرگر' , category:'burger',      image:'assets/web/others-image/burger_landing2.png'},
    {title:'پیتزا' ,   category:'pizza',       image:'assets/web/others-image/pizza_landing.png'},
    {title:'پاستا' ,   category:'pasta',       image:'assets/web/others-image/pasta_landing.png'},
    {title:'استیک' ,   category:'steak',       image:'assets/web/others-image/steak_landing.png'},
    {title:'تاکو'  ,   category:'taco',        image:'assets/web/others-image/taco_landing.png'},
    {title:'شاورما',   category:'shawarma',       image:'assets/web/others-image/kebab_landing.png'},
    {title:'اسنک'  ,   category:'snack',       image:'assets/web/others-image/snack_landing.png'},
    {title:'پیش غذا',  category:'appetizer',   image:'assets/web/others-image/appetizer_landing.png'},
  ]

  // foodItems:FoodMODEL[] = [
  //   {title:"دبل برگر" ,  category:"burger", image:"assets/foods/dbl-burger.png", description:"دو برگر و پنیر و پیاز و گوجه و فلفل و به همراه دو سس اضافه و کاهو و پنیر",price:"320 تومان"},
  //   {title:" برگر مخصوص" , category:"burger", image:"assets/foods/SmashBurger.png", description:"دو برگر و سس مخصوص و مقدار زیادی پیاز و نان گریل شده و دو پنیر",price:"320 تومان"},
  //   {title:"چیز برگر" ,  category:"burger", image:"assets/foods/CheeseBurger.png", description:"یک برگر گریل شده و پنیر اضافه و گوجه و خیارشور و سس کچاپ و نان گریل شده",price:"320 تومان"},
  //   {title:"چیکن برگر" ,  category:"burger", image:"assets/foods/ChickenBurger.png", description:"یک مرغ سوخاری و بیکن و سس کچاپ و کاهو و خیارشور و گوجه و پنیر و کاهو و سس اضافه",price:"320 تومان"},
  //   {title:" برگر گیاهی" ,  category:"burger", image:"assets/foods/VeganBurger.png", description:"یک برگر کاملا گیاهی و نان گیاهی و خیارشور و گوجه و کاهو و پیاز و سس مخصوص گیاهی",price:"320 تومان"},
  //   {title:"اسپشیال برگر" ,  category:"burger", image:"assets/foods/SpecialBurger.png", description:"یک برگر با سس مخصوص و کاهو و گوجه و خیارشور و بیکن و پنیر و نان گریل شده",price:"320 تومان"},
  //   {title:"بیکن برگر" ,  category:"burger", image:"assets/foods/BaconBurger.png", description:"دو برگر گریل شده با سس مخصوص و پنیر و گوجه و خیارشور و کاهو و بیکن و دو پنیر",price:"320 تومان"},
  //   {title:"ماشروم برگر" ,  category:"burger", image:"assets/foods/MushroomBurger.png", description:"دو برگر گریل شده و پنیر و مقدار زیادی قارچ سرخ شده و نان گریل شده",price:"320 تومان"},
  //   {title:"پیتزای پپرونی" ,  category:"pizza", image:"assets/foods/Pepperoni.png", description:"پیتزا پپرونی شامل سوسیس پپرونی تند، پنیر موزارلا و سس گوجه است که روی نان گریل‌شده سرو می‌شود.",price:"320 تومان" },
  //   {title:"پیتزای باربیکیو چیکن" ,  category:"pizza", image:"assets/foods/BBQChicken.png", description:"پیتزای باربیکیو چیکن شامل مرغ گریل‌شده، سس باربیکیو، پنیر موزارلا و پیاز قرمز است.",price:"320 تومان" },
  //   {title:"پیتزای گیاه خواران" ,  category:"pizza", image:"assets/foods/VeggiePizza.png", description:"پیتزای گیاه‌خواران شامل زیتون سیاه، فلفل دلمه‌ای، قارچ، گوجه و پنیر موزارلا است.",price:"320 تومان" },
  //   {title:"پیتزای مارگاریتا" ,  category:"pizza", image:"assets/foods/MargaritaPizza.png", description:"پیتزای مارگاریتا شامل سس گوجه، پنیر موزارلا و ریحان تازه است و طعمی ساده و اصیل دارد.",price:"320 تومان" },
  //   {title:"پیتزای سیر و استیک" ,  category:"pizza", image:"assets/foods/SteakPizza.png", description:"پیتزای سیر و استیک شامل استیک گریل‌شده، سس سیر، سس پستو و پنیر موزارلا است.",price:"320 تومان" },
  //   {title:"پیتزای مرغ" ,  category:"pizza", image:"assets/foods/ChickenPizza.png", description:"پیتزای مرغ شامل تکه‌های مرغ گریل‌شده، پنیر موزارلا، سس گوجه و ادویه‌جات است" ,price:"320 تومان"},
  //   {title:"پیتزای مخلوط" ,  category:"pizza", image:"assets/foods/MeatLovers.png", description:"پیتزای مخلوط ترکیبی از انواع مواد اولیه مانند قارچ، سوسیس، ژامبون و سبزیجات است ",price:"320 تومان" },
  //   {title:"پیتزای هاوایی" ,  category:"pizza", image:"assets/foods/HawaiianPizza.png", description:"پیتزای هاوایی ترکیبی از ژامبون، آناناس و پنیر است که طعمی شیرین و شور را به همراه دارد." ,price:"320 تومان"},
  //   {title:"پیتزای بیکن و قارچ" ,  category:"pizza", image:"assets/foods/Bacon-Pizza.png", description:"پیتزای بیکن و قارچ ترکیبی از بیکن دودی و قارچ‌های تازه با پنیر ذوب‌شده است." ,price:"320 تومان"},
  //   {title:"پیتزای مرغ و چیلی" ,  category:"pizza", image:"assets/foods/ChiliChicken.png", description:"پیتزای چیلی و مرغ ترکیبی از مرغ گریل‌شده، فلفل چیلی تند و پنیر است که طعمی تند و لذیذ دارد.",price:"320 تومان" },
  //
  // ]

  foodItems:FoodMODEL[] = []


  constructor(private http:HttpClient) {
    this.loadProducts().subscribe((response:FoodMODEL[])=>{
      this.foodItems = response
      console.log(response)
    })
  }

  loadProducts():Observable<FoodMODEL[]> {
    return this.http.get<FoodMODEL[]>(environment.websiteAPI+"/api/product/list")
  }

  nowCategory:string = this.categorys[0]['category']

  public getCategories():CategoryMODEL[] {
    return this.categorys;
  }

  public getFoodsByCategory(category: string):FoodMODEL[] {
    let foods:FoodMODEL[]  = []
    for (const food of this.foodItems) {
      if (food.category == category) {
        foods.push(food)
      }
    }
    return foods
  }

  // Get category information with its name, which gives us the information defined for that category
  public getCATEGORY(categoryID:string):CategoryMODEL {

    // Find the category index in the presentation of categories
    const categoryINDEX = this.getCategories().findIndex(x=>x.category == categoryID);

    // Here, if we find the category using index, we return its information, and if it is not found, we return the Not Found value.
    return this.getCategories()[categoryINDEX] || 'not found'
  }
}
