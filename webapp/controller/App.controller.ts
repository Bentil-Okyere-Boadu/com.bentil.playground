import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "./BaseController";
import config from "../utils/config";
import { UserService } from "../model/UserService";
import { LoginRes } from "../types";
import MessageBox from "sap/m/MessageBox";
import Dialog from "sap/m/Dialog";

/**
 * @namespace com.bentil.playground.controller
 */
export default class App extends BaseController {
	private Config = new config();
	public onInit(): void {
		// apply content density mode to root view
		this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		const token = this.Config.getAccessToken()
		this.setModel(new JSONModel({
			token: token,
			editable: false,
			editMode: true,
			login: {email: '', password: ''}
		}), 'app');

		const sToken = this.getModel('app').getProperty('/token');

		if(!sToken){
			this.openLogin();
		}
	}

	private pLoginDialog: any;
	private openLogin = () => {
		if (!this.pLoginDialog) {
			this.pLoginDialog = this.loadFragment({ name: "com.bentil.playground.view.fragments.Login"});
		}

		this.pLoginDialog.then( function (oDialog: { open: () => void;}){
			oDialog.open();
		})
	}

	private onCloseDialog() {
        const oDialog = this.byId("idloginDialog") as Dialog;
        oDialog.close();
    }

	private onLoginBtnPress = async () => {
		const oAppModel = this.getModel('app') as JSONModel
		const oLoginDetails = oAppModel.getProperty('/login');
		const response = await UserService().userLogin(oLoginDetails);
		if(typeof response == 'number') {
			MessageBox.error('Error: Invalid email or password');
			return;
		}

		oAppModel.setProperty('/token', (response as LoginRes).token);
		this.Config.setAccessToken(oAppModel.getProperty('/token'));
		this.onCloseDialog();
		this.navTo('main');
	}
}
