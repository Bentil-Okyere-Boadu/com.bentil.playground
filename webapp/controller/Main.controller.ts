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
	public async onInit() {

		this.getRouter().getRoute("main").attachPatternMatched(this.onRouteMatched, this)
	}
	
	public async onRouteMatched() {
		const oAppModel = (this.getModel('app')) as JSONModel;
		oAppModel.setProperty('/editable', false);
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

	private onCreateMemberPress = () => {
		const oAppModel = (this.getModel('app')) as JSONModel;
		oAppModel.setProperty('/editMode', false);
		oAppModel.setProperty('/editable', true);
		this.navTo('details')
	} 
}
