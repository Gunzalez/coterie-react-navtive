
const apiHost = 'https://coterie-rest-app.herokuapp.com';

export default {
    async registerAndGetBackToken(){
        try {
            const response = await fetch( apiHost + '/registrations', {
                method: 'POST',
                body: JSON.stringify({})
            });
            return await response.headers.get("Location").split('/');
        } catch (error) {
            console.error(error);
        }
    }
}