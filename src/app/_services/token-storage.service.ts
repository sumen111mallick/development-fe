import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const ID_KEY = 'id_key';
const COMPARE = '';
const SEARCH_DATA = 'data';
const LAWYER_ID = 'data';
const PROD_ID = 'data';
const PROD2_ID = 'data';
const form_Data ='form_data';
const pro_type = 'pro_data';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signout(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    return (sessionStorage.getItem(TOKEN_KEY));
  }

  public removeToken(): any {
    return (sessionStorage.removeItem(TOKEN_KEY));
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public searchData(data: any): void{
    window.sessionStorage.removeItem(SEARCH_DATA);
    window.sessionStorage.setItem(SEARCH_DATA, JSON.stringify(data));
  }

  public returnSearch(): any{
    return JSON.parse(sessionStorage.getItem(SEARCH_DATA));
  }
  public RemoveSearch(): any{
    window.sessionStorage.removeItem(SEARCH_DATA);
  }
  // search_pro_type
  public search_pro_type(pro_data: any): void{
    window.sessionStorage.removeItem(pro_type);
    window.sessionStorage.setItem(pro_type, JSON.stringify(pro_data));
  }
  public get_pro_type(): any{
    return JSON.parse(sessionStorage.getItem(pro_type));
  }
  public Remove_pro_type(): any{
    window.sessionStorage.removeItem(pro_type);
  }
   // form data
   public search_formData(form_data: any): void{
    window.sessionStorage.removeItem(form_Data);
    window.sessionStorage.setItem(form_Data, JSON.stringify(form_data));
  }
  public get_formData(): any{
    return JSON.parse(sessionStorage.getItem(form_Data));
  }
  public Remove_form_data(): any{
    window.sessionStorage.removeItem(form_Data);
  }

  public saveProdId(id: string): void {
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY, id);
  }

  public getProdId(): any {
    return(sessionStorage.getItem(ID_KEY));
  }

  public saveProd2Id(id: string): void {
    window.sessionStorage.removeItem(PROD2_ID);
    window.sessionStorage.setItem(PROD2_ID, id);
  }

  public getProd2Id(): any {
    return(sessionStorage.getItem(PROD2_ID));
  }

  public saveCdata(id: string): void {
    window.sessionStorage.removeItem(COMPARE);
    window.sessionStorage.setItem(COMPARE, id);
  }

  public getCdata(): any{
    return(sessionStorage.getItem(COMPARE));
  }

  public setLawyer(id: string): void {
      window.sessionStorage.removeItem(LAWYER_ID);
      window.sessionStorage.setItem(LAWYER_ID, id);
  }

  public getLawyer(): any{
    return(sessionStorage.getItem(LAWYER_ID));
  }

  public setProduct(id: string): void {
      window.sessionStorage.removeItem(PROD_ID);
      window.sessionStorage.setItem(PROD_ID, id);
  }

  public getProduct(): any{
    return(sessionStorage.getItem(PROD_ID));
  }


}
