import { AsyncStorage } from "react-native";

const apiHost = 'https://coterie-rest-app.herokuapp.com';

export default {
    accessToken: '',
    headers: null,

    setHeadersForFetch(){
        const headers = new Headers();
        const value = 'token:' + this.accessToken;
        headers.append('Authorization', value);
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');
        this.headers = headers;
    },

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

    async getAllPots(){
        try {

            const options = {
                method: 'GET',
                headers: this.headers
            };
            const response = await fetch( apiHost + '/plans/', options );
            return await response.json();

        }  catch (e) {
            console.error(e);
        }
    },

    async getAPot(id){
        try {

            const options = {
                method: 'GET',
                headers: this.headers
            };
            const response = await fetch( apiHost + '/plans/' + id, options );
            return await response.json();

        }  catch (e) {
            console.error(e);
        }
    },

    async addAPot(potDetail){
        try {

            const options = {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(potDetail)
            };
            const response = await fetch( apiHost + '/plans/', options );
            return await response.headers.get("Location").split("/");

        } catch (error){
            console.error(error)
        }
    }
}