import MessageBox from "sap/m/MessageBox";
import { fetchAPI } from "../utils/APISetup"
import { User } from "../types";
import { FetchMethods } from "../utils/enums";

export const UserService = ()  => {
    return {
        readUsers: async (): Promise<User[]> => {
            const response: Response = await fetchAPI('users', FetchMethods.GET);
            if(response.ok) {
                const aUsers = (await response.json()) as User[];
                return aUsers;
            } else {
                MessageBox.error('An error occured')
            }
        },
        readSingleUser: () => {},
        deleteUser: () => {},
    }
}