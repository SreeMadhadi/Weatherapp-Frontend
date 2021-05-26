const express = require('express');
const app = express();
const hbs = require("hbs");
const path = require("path");


const weatherdata = require('../utils/weatherdata');

const port = process.env.PORT || 3000

const publicStaticDirPath = path.join(__dirname, '../public')

const viewspath = path.join(__dirname, '../templates/views');
const partialpath = path.join(__dirname,'../template/partials');

app.set('view engine','hbs');
app.set('views', viewspath)
hbs.registerPartials(partialpath);
app.use(express.static(publicStaticDirPath));



// app.get('',(req,res)=> {
//     res.send("Weather APP Launch");
// })

app.get('', (req,res) => {
    res.render('index'), {
        title: 'Weather App'
    }
}
)

app.get('/weather',(req,res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: "Please enter the address"
        })
    }

    weatherdata(address,(error,bodyContent)=> {
        if(error) {
            return res.send({
                error
            })
        }

       // res.send("hi sreeja");
        let obj={
            "temperature":bodyContent.body.main.temp,
            "description":bodyContent.body.weather[0].description,
            "location":bodyContent.body.name

    }
        console.log("obj",obj)
        res.send(obj)
    })
});

app.get("*",(req,res)=>{
    res.send("Page not found")
})

app.listen(port, () => {console.log("Server is up and running on port:",port);
}
)