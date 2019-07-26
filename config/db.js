require('dotenv')
if(process.env.NODE_ENV == 'production'){
    module.exports = { mongoURI: 'mongodb+srv://robson:lya250916@aprende-7hqdd.mongodb.net/test?retryWrites=true&w=majority'}
}else{
    module.exports = {mongoURI: 'mongodb://localhost/netlinkHomolog'}
}
