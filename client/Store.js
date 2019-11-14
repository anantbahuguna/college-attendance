import {observable, action, computed} from "mobx";


class Store {
    @observable LoginInfo = { isLoggedIn: false}

    @action setLogin(isLoggedIn) {
        this.LoginInfo = {
            isLoggedIn
        }
    }
}

const appStore = new Store();

export default appStore;