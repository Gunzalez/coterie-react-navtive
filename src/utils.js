
export default {
    style: {
        colours: {
            purple: '#8e44ad',
            purpleLight: '#9b59b6',
            white: '#ffffff',
            gray: '#d2d6d7',
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
        },
        toPascalCase (string){
            let String = string.replace(/\w+/g,
                function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();});
            return String;
        }
    }
}
