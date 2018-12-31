
export default {
    style: {
        colours: {
            purple: '#8e44ad',
            purpleLight: '#9b59b6',
            white: '#ffffff',
            gray: '#e9e9e9',
            grayText: '#7f8c8d',
            orange: '#f39c12',
            yellow: '#f1c40f',
            grayLight: '#efefef',
            grayDark: '#2c3e50',
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
