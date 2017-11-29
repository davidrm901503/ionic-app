export class Positions {
  public id: string
  public title: string;
  public latitude: number;
  public longitude: number;
  public distance: Object;

  constructor( id?: string, title?: string,latitude?: number,longitude?: number,distance?: Object ) {

    this.id=id;
    this.title=title;
    this.latitude=latitude;
    this.longitude=longitude;
    this.distance=distance;
  }
}
