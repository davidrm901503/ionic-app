
export class sendGalery{
  filename:string;
  filetype:string;
  value	:string;
}
export class sendPositions{
  title:string;
  longitude:number;
  latitude	:number;
}
export class sendService {
  title	: string;
  subtitle: string;
  address: string;
  phone: string;
  email: string;
  url: string;
  description: string;
  start_time: string;
  end_time: string;
  other_phone: any;
  galery:sendGalery[];
  positions:sendPositions[];
  week_days:boolean[];
  cities:number[];
  categories:number[];
  icon:sendGalery;



}

