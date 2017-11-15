    $(document).ready(()=>{
      //Hide Login form & show Registration form
      $('#newUser').click(()=>{
        $('#loginForm').modal('toggle');
        $('#regForm').modal('toggle');
      });

      //Prevent submitting when passwords don't match
      $('#registrationForm').submit((evt)=>{

        if($('input[name=regVerified]').val() === 0) {
          evt.preventDefault();
          var pwd1 = $('input[name=passw]').val();
          var pwd2 = $('input[name=repeatpassword]').val();

          if(pwd1 != pwd2) {
            console.log(false)
            alert('Your two passwords to not match');
          } else {
            console.log(true)
            $('input[name=regVerified]').val('1');
            $('#registrationForm').submit();
          }
        }
    })
    
    function adjImg() {
     var height = $(window).height()
     $('#imgRow').css('max-height',(height-45)+'px')
    }
    $(window).resize(()=>{
      adjImg();
    })
    
    
    adjImg();
  })
