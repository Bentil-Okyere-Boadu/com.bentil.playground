import MessageBox from "sap/m/MessageBox";
import { fetchAPI } from "../utils/APISetup"
import { LoginRes, User } from "../types";
import { FetchMethods } from "../utils/enums";

export const UserService = ()  => {
    return {
        userLogin: async (loginDetails : { email: string, password: string }) : Promise<Number | LoginRes> => {
            const response: Response = await fetchAPI('user/login', FetchMethods.POST, loginDetails);
            if(response.ok) {
                const user = (await response.json()) as LoginRes;
                return user;
            } else{
                return response.status
            }
        },
        readUsers: async (): Promise<User[]> => {
            try {
                const response: Response = await fetchAPI('user', FetchMethods.GET);
                if(response.ok) {
                    const aUsers = (await response.json()) as User[];
                    return aUsers;
                }
            } catch (error) {
                MessageBox.error(error as string)
            } 
        },
        readSingleUser: async (sId: string) : Promise<User> => {
            try {
                const response: Response = await fetchAPI(`user/${sId}`, FetchMethods.GET);
                if(response.ok) {
                    const aUsers = (await response.json()) as User;
                    return aUsers;
                }
            } catch (error) {
                MessageBox.error(error as string)
            }
        },
        deleteUser: async (sId: string) => {
            try {
                const response: Response = await fetchAPI(`user/${sId}`, FetchMethods.DELETE);
            if(response.ok) {
                const aUsers = (await response.json()) as User;
                return aUsers;
            }
            } catch (error) {
                MessageBox.error(error as string)
            }
        },
    }
}