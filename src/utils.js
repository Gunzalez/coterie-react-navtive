
export default {
    style: {
        colours: {
            purple: '#ba55d3',
            white: '#ffffff',
            gray: '#e9e9e9',
            grayText: '#868686',
            orange: '#fc6621',
            grayLight: '#efefef',
            background: '#f5f5f5'
        },
        icons: {
            top: 36,
            body: 30,
            footer: 40
        },
        text: {
            header: 22,
            heading: 18,
            copy: 14
        }
    },
    js: {
        thousandth: function (value) {
            const valueString = value.toString();
            return valueString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        sort: function (array) {
            array.sort(function(a, b){
                const nameA = a.givenName.toLowerCase();
                const nameB = b.givenName.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0
            });
            return array;
        },
        getContactDetailFromId (id, param, contacts){
            let returnName = 'Participant';
            contacts.forEach(contact => {
                if(contact.recordID === id){
                    returnName = contact[param].trim()
                }
            });
            return returnName;
        }
    }
}
