import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "./BaseController";
import { Router$RouteMatchedEvent } from "sap/ui/core/routing/Router";
import { UserService } from "../model/UserService";

export default class Details extends BaseController {
    public onInit(): void {
        this.getRouter().getRoute("details").attachPatternMatched(this.onRouteMatched, this)
    }

    public async onRouteMatched(this: Details, oEvent: Router$RouteMatchedEvent) {
		const oAppModel = (this.getModel('app')) as JSONModel;
		const sToken = oAppModel.getProperty('/token');
        const userId = oEvent.getParameter("arguments").id;

        const response = await UserService().readSingleUser(userId);
        if(typeof response == 'object' ){
            oAppModel.setProperty('/user', response)
        }
	}
}