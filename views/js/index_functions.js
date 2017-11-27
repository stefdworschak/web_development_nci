function shareCal(){
       var sharemail = $('input[name=sharemail]').val();
       $.ajax({
         url: '/post/share',
         method: 'post',
         data: {'sharemail':sharemail}
       }).done((res)=>{
         if(res === 'success'){
           console.log('success');
           window.location = '/'
         } else {
           //Add error handling!!
           $('#share-error').css('display','block');
           $('#share-error').text(res);
           $('shareForm').on('hidden.bs.modal', function () {
                $('#share-error').css('display','none');
            })
           $('#share-error').blur(()=>{$('#share-error').css('display','block')})
           
           console.log("error"+res);
           
         }
       });
     }
     
     function changePw(){
       var curPassword = $('input[name=curPw]').val();
       var newPassword = $('input[name=newPw]').val();
       var repeatPassword = $('input[name=repeatPw]').val();
       if(newPassword === repeatPassword) {
          $.ajax({
             url: '/post/change_password',
             method: 'post',
             data: {'current_password':curPassword,'new_password':newPassword}
           }).done((res)=>{
             if(res === 'success'){
               console.log('success');
               window.location = '/'
             } else {
               //Add error handling!!
               $('#change-pw-error').css('display','block');
               $('#change-pw-error').text(res);
               $('changePwForm').on('hidden.bs.modal', function () {
                    $('#share-error').css('display','none');
                })
               $('#change-pw-error').blur(()=>{$('#change-pw-error').css('display','block')})

               console.log("error"+res);

             }
           });
       }
 
       
       
     }
      
      function hideMod(id){
        $(id).hide();
         $('body').removeClass('modal-open');
         var back = $('.modal-backdrop');
        console.log(back.length)
         for(i=0;i<back.length;i++){
           console.log(i)
           $('.modal-backdrop').remove();
         }
      }