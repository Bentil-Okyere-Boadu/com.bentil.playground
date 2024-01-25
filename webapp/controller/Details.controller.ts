import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "./BaseController";
import { Router$RouteMatchedEvent } from "sap/ui/core/routing/Router";
import { UserService } from "../model/UserService";
import { User } from "../types";
import MessageBox from "sap/m/MessageBox";
import { Button$PressEvent } from "sap/m/Button";

export default class Details extends BaseController {
    public onInit(): void {
        this.getRouter().getRoute("details").attachPatternMatched(this.onRouteMatched, this)
    }

    public async onRouteMatched(this: Details, oEvent: Router$RouteMatchedEvent) {
		const oAppModel = (this.getModel('app')) as JSONModel;
        const userId = oEvent.getParameter("arguments").id;
        if(userId) {
            const response = await UserService().readSingleUser(userId);
            if(typeof response == 'object' ){
                oAppModel.setProperty('/user', response)
            }
        } else {
            oAppModel.setProperty('/user', {} as User);
        }
	}

    private onEditUserPress = () => {
        const oAppModel = (this.getModel('app')) as JSONModel;
        oAppModel.setProperty('/editable', true);
    }

    private onSaveUserClick = async () => {
        const oAppModel = (this.getModel('app')) as JSONModel;
        const oUser = (oAppModel.getProperty('/user')) as User;
        const bEditMode = oAppModel.getProperty('/editMode');
        bEditMode? this.updateMember(oUser) : this.createMember(oUser);
    }

    private createMember = async (oUser: User) => {
        const serviceResponse = await UserService().saveUser(oUser);
        if(typeof serviceResponse == 'number') {
            MessageBox.error('Error: User info could not be updated.')
            return
        } 
        MessageBox.show('Member created successfully',{
			actions: ["OK"],
			onClose: (sAction: string) => {
				if(sAction === "OK"){
					this.navTo('main')
				}
			}
		});
    }
    private updateMember = async (oUser: User) => {
        const oAppModel = (this.getModel('app')) as JSONModel;
		const id = ((oAppModel.getProperty('/user') )as User)._id as string;
        const serviceResponse = await UserService().editUser(id, oUser);
        if(typeof serviceResponse == 'number') {
            MessageBox.error('Error: User info could not be updated.')
            return
        }
        MessageBox.show('Member updated successfully', {
			actions: ["OK"],
			onClose: (sAction: string) => {
				if(sAction === "OK"){
					this.navTo('main')
				}
			}
		});
    }
    private onDeleteBtnPress = (oEvent: Button$PressEvent) => {
        const oAppModel = (this.getModel('app')) as JSONModel;
		const id = ((oAppModel.getProperty('/user') )as User)._id as string;
		MessageBox.confirm('Are you sure you want to delete user?', {
			actions: ["YES", "NO"],
			emphasizedAction: "YES",
			onClose: async (sAction: string) => {
				if(sAction === "YES"){
					await UserService().deleteUser(id);
					this.navTo('main')
				}
			}
		})
	}
}