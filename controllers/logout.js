const logout = ( req, res) => {
    req.session.destroy((err) => {
        if(err){
            console.log('Erro ao encerrar a sessão: ', err)
        }else{
            res.redirect('/') 
        }      
    })
}

module.exports = { logout }