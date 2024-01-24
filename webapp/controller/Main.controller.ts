import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import { UserService } from "../model/UserService";
import { User } from "../types";
import JSONModel from "sap/ui/model/json/JSONModel";
import { ListItemBase$PressEvent } from "sap/m/ListItemBase";
import { Button$PressEvent } from "sap/m/Button";

/**
 * @namespace com.bentil.playground.controller
 */
export default class Main extends BaseController {
	public async onInit() {

		this.getRouter().getRoute("main").attachPatternMatched(this.onRouteMatched, this)
	}
	
	public async onRouteMatched() {
		const oAppModel = (this.getModel('app')) as JSONModel;
		const sToken = oAppModel.getProperty('/token');
		if(sToken) {
			const aUsers: User[] = await this.getUsers();
			oAppModel.setProperty('/users', aUsers);		
		}
	}

	private getUsers = async () : Promise<User[]> => {
		const aUsers: User[] = await UserService().readUsers();
		return aUsers;
	}

	public onColumnListItemPress = (oEvent: ListItemBase$PressEvent) => {
		const id = (oEvent.getSource().getBindingContext('app').getProperty('_id')) as string;
		this.navTo('details', { id: id });
	}

	public onDeleteBtnPress = (oEvent: Button$PressEvent) => {
		const id = (oEvent.getSource().getBindingContext('app').getProperty('_id')) as string;
		MessageBox.confirm('Are you sure you want to delete user?', {
			actions: ["YES", "NO"],
			emphasizedAction: "YES",
			onClose: async (sAction: string) => {
				if(sAction === "YES"){
					await UserService().deleteUser(id);
					this.getModel('app').refresh(true);
				}
			}
		})
	}
}
