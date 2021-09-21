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

  /*signout(): void {
    window.sessionStorage.clear();
  }*/

  signout(): void {
    localStorage.clear();
  }

  /*public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }*/

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  /*public getToken(): any {
    return (sessionStorage.getItem(TOKEN_KEY));
  }*/

  public getToken(): any {
    return (localStorage.getItem(TOKEN_KEY));
  }

  /*public removeToken(): any {
    return (sessionStorage.removeItem(TOKEN_KEY));
  }*/

  public removeToken(): any {
    return (localStorage.removeItem(TOKEN_KEY));
  }

  /*public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }*/

  public saveUser(user): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /*public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }*/

  public getUser(): any {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }

  /*public searchData(data: any): void{
    window.sessionStorage.removeItem(SEARCH_DATA);
    window.sessionStorage.setItem(SEARCH_DATA, JSON.stringify(data));
  }*/

  public searchData(data: any): void{
    localStorage.removeItem(SEARCH_DATA);
    localStorage.setItem(SEARCH_DATA, JSON.stringify(data));
  }

  /*public returnSearch(): any{
    return JSON.parse(sessionStorage.getItem(SEARCH_DATA));
  }*/

  public returnSearch(): any{
    return JSON.parse(localStorage.getItem(SEARCH_DATA));
  }

  /*public RemoveSearch(): any{
    window.sessionStorage.removeItem(SEARCH_DATA);
  }*/

  public RemoveSearch(): any{
    localStorage.removeItem(SEARCH_DATA);
  }

  // search_pro_type
  /*public search_pro_type(pro_data: any): void{
    window.sessionStorage.removeItem(pro_type);
    window.sessionStorage.setItem(pro_type, JSON.stringify(pro_data));
  }*/

  public search_pro_type(pro_data: any): void{
    localStorage.removeItem(pro_type);
    localStorage.setItem(pro_type, JSON.stringify(pro_data));
  }

  /*public get_pro_type(): any{
    return JSON.parse(sessionStorage.getItem(pro_type));
  }*/

  public get_pro_type(): any{
    return JSON.parse(localStorage.getItem(pro_type));
  }

  /*public Remove_pro_type(): any{
    window.sessionStorage.removeItem(pro_type);
  }*/

  public Remove_pro_type(): any{
    localStorage.removeItem(pro_type);
  }

   // form data
   /*public search_formData(form_data: any): void{
    window.sessionStorage.removeItem(form_Data);
    window.sessionStorage.setItem(form_Data, JSON.stringify(form_data));
  }*/

  public search_formData(form_data: any): void{
    localStorage.removeItem(form_Data);
    localStorage.setItem(form_Data, JSON.stringify(form_data));
  }

  /*public get_formData(): any{
    return JSON.parse(sessionStorage.getItem(form_Data));
  }*/

  public get_formData(): any{
    return JSON.parse(localStorage.getItem(form_Data));
  }

  /*public Remove_form_data(): any{
    window.sessionStorage.removeItem(form_Data);
  }*/

  public Remove_form_data(): any{
    localStorage.removeItem(form_Data);
  }

  /*public saveProdId(id: string): void {
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY, id);
  }*/

  public saveProdId(id: string): void {
    localStorage.removeItem(ID_KEY);
    localStorage.setItem(ID_KEY, id);
  }

  /*public getProdId(): any {
    return(sessionStorage.getItem(ID_KEY));
  }*/

  public getProdId(): any {
    return(localStorage.getItem(ID_KEY));
  }

  /*public saveProd2Id(id: string): void {
    window.sessionStorage.removeItem(PROD2_ID);
    window.sessionStorage.setItem(PROD2_ID, id);
  }*/

  public saveProd2Id(id: string): void {
    localStorage.removeItem(PROD2_ID);
    localStorage.setItem(PROD2_ID, id);
  }

  /*public getProd2Id(): any {
    return(sessionStorage.getItem(PROD2_ID));
  }*/

  public getProd2Id(): any {
    return(localStorage.getItem(PROD2_ID));
  }

  /*public saveCdata(id: string): void {
    window.sessionStorage.removeItem(COMPARE);
    window.sessionStorage.setItem(COMPARE, id);
  }*/

  public saveCdata(id: string): void {
    localStorage.removeItem(COMPARE);
    localStorage.setItem(COMPARE, id);
  }

  /*public getCdata(): any{
    return(sessionStorage.getItem(COMPARE));
  }*/

  public getCdata(): any{
    return(localStorage.getItem(COMPARE));
  }

  /*public setLawyer(id: string): void {
      window.sessionStorage.removeItem(LAWYER_ID);
      window.sessionStorage.setItem(LAWYER_ID, id);
  }*/

  public setLawyer(id: string): void {
    localStorage.removeItem(LAWYER_ID);
    localStorage.setItem(LAWYER_ID, id);
}

  /*public getLawyer(): any{
    return(sessionStorage.getItem(LAWYER_ID));
  }*/

  public getLawyer(): any{
    return(localStorage.getItem(LAWYER_ID));
  }

  /*public setProduct(id: string): void {
      window.sessionStorage.removeItem(PROD_ID);
      window.sessionStorage.setItem(PROD_ID, id);
  }*/

  public setProduct(id: string): void {
    localStorage.removeItem(PROD_ID);
    localStorage.setItem(PROD_ID, id);
}

  /*public getProduct(): any{
    return(sessionStorage.getItem(PROD_ID));
  }*/

  public getProduct(): any{
    return(localStorage.getItem(PROD_ID));
  }

}
