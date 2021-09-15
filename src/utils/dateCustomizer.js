import moment from "moment";

const dateCustomizer = (dateObj) => {
        let date;
        if(dateObj.getMonth){
            date = dateObj
        }
        else{
            date = dateObj.toDate()
        }
        return moment(date).format('MMM Do YYYY, h:mm:ss a');
}

export default dateCustomizer;