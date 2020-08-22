import { SystemRequirements } from './product-elements/system-requirements';
import { SocialLinks } from './product-elements/social-links';
import { Description } from './product-elements/description';
import { ImageURL } from './product-elements/image-url';

export class Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  quantity: number;
  embed: string;
  developer: string;
  publisher: string;
  releaseDate: string;
  tags: string[];
  rating: string;
  platform: string;
  detailedDescription: Description[];
  detailedDescriptionImagesUrls: ImageURL[];
  socialLinks: SocialLinks;
  minimumSysReq: SystemRequirements;
  recommendedSysReq: SystemRequirements;
  languagesSupported: string;

  constructor(){
    this.name = "";
    this.description = "";
    this.price = "";
    this.imageUrl = "";
    this.quantity = 0;
    this.embed = "";
    this.developer = "";
    this.publisher = "";
    this.releaseDate = "";
    this.tags = [];
    this.rating = "";
    this.platform = "";
    this.detailedDescription = new Array<Description>();
    this.detailedDescriptionImagesUrls = new Array<ImageURL>();
    this.socialLinks = new SocialLinks();
    this.minimumSysReq = new SystemRequirements();
    this.recommendedSysReq = new SystemRequirements();
    this.languagesSupported = "";
  }
}