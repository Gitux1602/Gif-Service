import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})

export class GifsService 
{

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'WjgjYTj3OM7eVu9nahzhql34XGXVtROh';
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';
  constructor( private http: HttpClient) { }
  
  get tagsHistory()
  {
    return [...this._tagsHistory];
  }
  
  searchTag(tag: string): void{ //Esta funcion busca los valores que la persona inidica. Ex: Valorant, Gatos, Memes...
    if(tag.length === 0) return; //Validacion que tenga caracteres la cadena
    this.organizeHistory(tag); //Llamamos la funcion organizeHistory

    const params = new HttpParams()
    .set('api_key', this.apiKey )
    .set('limit', '10' )
    .set('q', tag )

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params }) //Esto es un observable
    .subscribe(res => {
      this.gifList = res.data;
      console.log(this.gifList);
    });
  }


  private organizeHistory(tag: string){
    tag = tag.toLowerCase(); //Pasamos a minusculas
    if(this._tagsHistory.includes(tag)){ //Si el tag ya existe removerlo y ponerlo al principio
      this._tagsHistory = this._tagsHistory.filter((oldTag)=> oldTag !== tag); //old tag si es diferente al que recibo lo dejo pasar
    }
    this._tagsHistory.unshift(tag); //Agrega el tag como el primero de la lista
    this._tagsHistory = this.tagsHistory.splice(0,10);
  }
}
