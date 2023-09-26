import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)             
    }
    async createAccount({email,password,name}){
        try {
          const userAccount = await this.account.create(ID.unique(), email, password, name)
          if (userAccount) {
            //call another method
            return this.login({email,password});
          }
          else{
            // console.log("Appwrite service :: createAccount :: error",error);
            return userAccount
          }
        } catch (error) {
            throw error
        }
    }
    async login ({email,password}){
        try {
          return await this.account.createEmailSession(email,password) 
        } catch (error) {
            // console.log("Appwrite service :: login :: error",error);
           return error 
        }
    }
    async getCurrentUser(){
        try {
           return await this.account.get();
        } catch (error) {
            return error
        }

        return null
    }
    async logout(){
        try {
           return await  this.account.deleteSessions()
        } catch (error) {
            return error
        }

    }
}

const authService = new AuthService();


export default authService