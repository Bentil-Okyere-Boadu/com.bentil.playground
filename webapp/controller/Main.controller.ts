import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import { UserService } from "../model/UserService";
import { User } from "../types";
import JSONModel from "sap/ui/model/json/JSONModel";
import { ListItemBase$PressEvent } from "sap/m/ListItemBase";

/**
 * @namespace com.bentil.playground.controller
 */
export default class Main extends BaseController {
	private oLocalModel = 'DataRepo'
	public async onInit() {
		const aUsers: User[] = await this.getUsers();
		const oModel = new JSONModel({
			users: aUsers
		});

		this.setModel(oModel, this.oLocalModel)
		
	}
	public sayHello(): void {
		MessageBox.show("Hello World!");
	}

	private getUsers = async () : Promise<User[]> => {
		const aUsers: User[] = await UserService().readUsers();
		return aUsers;
	}

	public onColumnListItemPress = (oEvent: ListItemBase$PressEvent) => {
		const sPath = (oEvent.getSource().getBindingContextPath(this.oLocalModel)) as string
		console.log(sPath)
	}
}
