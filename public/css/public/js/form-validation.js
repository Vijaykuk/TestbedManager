$(function() {
  $("#search-call-form").validate({
    errorClass:"validation_error",

    rules: {
   
      RELEASECODE: {
        noWildcard: true
      }

    },
    
    submitHandler: function(form) { 
        return true;
    }
    
  });


});

jQuery.validator.addMethod("noWildcard", function(value, element){
    return !(/\*/.test(value));
}, "Wildcards are not allowed for this field");