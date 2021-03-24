/*exports to Products component */

//formatCurrency function that accepts a number & converts it to currency format
export default {
    formatCurrency: function (num) {
        return '$' + Number(num.toFixed(2)).toLocaleString() + '  ';
    }
}