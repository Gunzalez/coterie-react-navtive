
export default {
    style: {
        colours: {
            purple: '#ba55d3',
            white: '#ffffff',
            gray: '#cccccc'
        },
        icons: {
            size: 32
        },
        text: {
            header: 22,
            heading: 18,
            copy: 14
        }
    },
    js: {
        getIds: function (array) {
            return array.map(function (x) { return x.id; }).sort();
        },
        areDifferentByIds: function (a, b) {
            let idsA = this.getIds(a);
            let idsB = this.getIds(b);

            if (idsA.length !== idsB.length) {
                return true;
            }

            for (let i = 0; i < idsA.length; ++i) {
                if (idsA[i] !== idsB[i]) {
                    return true;
                }
            }

            return false;
        }
    }
}
