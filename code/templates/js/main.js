$(document).ready(function(){
    
    function changeDivComponents(tab_element_clicked){
        $(".tabcontent").each(function(index){
            let this_id = $(this).attr('id');
            if (this_id === tab_element_clicked.toLowerCase()){
                $(this).show();
            }else{
                $(this).hide();
            }                    
        });

    }
    $(".tablinks").click(function(){
        let tab_id = $(this).attr('id').replace('-btn', '');
        changeDivComponents(tab_id);
    });
});