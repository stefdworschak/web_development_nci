module.exports = function (req,res){
    req.session.destroy((err)=>{

    });
    res.redirect('/')
}