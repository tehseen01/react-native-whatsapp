import {Account, Client, ID} from 'appwrite';
import Config from 'react-native-config';
import Snackbar from 'react-native-snackbar';

const appwriteClient = new Client();

const APPWRITE_ENDPOINT = Config.APPWRITE_URL!;
const APPWRITE_PROJECT_ID = Config.APPWRITE_PROJECT_ID!;

class AuthService {
  account: Account;

  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);
    this.account = new Account(appwriteClient);
  }

  async createPhoneSession(phone: string) {
    try {
      const session = await this.account.createPhoneSession(ID.unique(), phone);
      return session.userId;
    } catch (error: any) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('Appwrite service :: createPhoneSession() :: ' + error);
    }
  }

  async phoneVerify(userId: string, code: string) {
    try {
      const res = await this.account.updatePhoneSession(userId, code);
      return res;
    } catch (error) {
      console.log('Appwrite service :: phoneVerify() :: ' + error);
      throw error;
    }
  }

  async updateProfile(name: string) {
    try {
      const res = await this.account.updateName(name);
      return res;
    } catch (error) {
      console.log('Appwrite service :: updateProfile() :: ' + error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSession('current');
    } catch (error) {
      console.log('Appwrite service :: logout() :: ' + error);
    }
  }

  async currentUser() {
    try {
      const user = await this.account.get();

      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

export default AuthService;
