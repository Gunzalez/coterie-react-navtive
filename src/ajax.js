import { AsyncStorage } from "react-native";

const apiHost = 'https://coterie-rest-app.herokuapp.com';

export default {
    async registerAndReturnRegistrationString(){
        try {
            const response = await fetch( apiHost + '/registrations', {
                method: 'POST',
                body: JSON.stringify({})
            });
            return await response.headers.get("Location").split('/');
        } catch (error) {
            console.error(error);
        }
    },

    async getAccessTokenRegistrationString(registrationString){
        try {
            const response = await fetch( apiHost + '/registrations/' + registrationString, {
                method: 'GET'
            });
            return await response.json()
        } catch (error){
            console.error(error);
        }
    },

    async saveAccessTokenToStorage(accessToken){
        try {
            await AsyncStorage.setItem('accessToken', accessToken);
        } catch (error) {
            // Error setting data
            console.log(error.message);
        }
    },

    async getAccessTokenFromStorage(){
        try {
            const value = await AsyncStorage.getItem('accessToken');
            return value !== null ? value : null;
        } catch (error) {
            console.error(error);
        }
    },

    async removeAccessTokenFromStorage(){
        try {
            await AsyncStorage.removeItem('accessToken');
        } catch (error) {
            console.error(error);
        }
    },

    async addAPot(pot, headerOptions = ['Authorization', 'token:' + '===null===']){

        try {

            const headers = new Headers();
            headers.append(headerOptions);

            const options = { headers };
            const body = {
                method: 'POST',
                body: JSON.stringify({plan: pot})
            };

            const response = await fetch( apiHost, body, options );
            return await response.json();

        } catch (error){
            console.error(error)
        }
    }
}