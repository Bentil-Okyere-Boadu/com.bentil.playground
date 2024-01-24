import MessageBox from "sap/m/MessageBox";
import { fetchAPI } from "../utils/APISetup"
import { User } from "../types";
import { FetchMethods } from "../utils/enums";

export const UserService = ()  => {
    return {
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
        readSingleUser: () => {},
        deleteUser: async (sId: string) => {
            try {
                const response: Response = await fetchAPI(`user/${sId}`, FetchMethods.DELETE);
            if(response.ok) {
                const aUsers = (await response.json()) as User[];
                console.log(aUsers)
                return aUsers;
            }
            } catch (error) {
                MessageBox.error(error as string)
            }
        },
    }
}