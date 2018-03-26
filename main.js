   // RAJU, CHANDAN
   // JADRAN 032
   // PROJECT 1
   // SPRING 2018
$(document).ready(function() {
	$('[name="user"]').val('');
	$('[name="user"]').focus();	
	});

$(document).ready(function() {
    $("#tabs").tabs();  
  });

function isSkuFormat(name){
        var format = new RegExp(/([A-Z][A-Z][A-Z]-[0-9][0-9][0-9])/);
        return format.test(name);
    }

function isEmpty(fieldValue) {
        return $.trim(fieldValue).length == 0;    
        } 

var handle = $('input[name="product_image"]');
    var size=0;

$(document).ready( function() {
    var errorStatusHandle = $('[name="errormsg"]');
    var elementHandle = new Array(10);
    elementHandle[0] = $('[name="sku"]');
    elementHandle[1] = $('[name="category"]');
    elementHandle[2] = $('[name="vendor"]');
    elementHandle[3] = $('[name="mid"]');
    elementHandle[4] = $('[name="description"]');
    elementHandle[5] = $('[name="features"]');
    elementHandle[6] = $('[name="cost"]');
    elementHandle[7] = $('[name="retail"]');
    elementHandle[8] = $('[name="qty"]');
    elementHandle[9] = $('[name="product_image"]');
	elementHandle[0].focus();

	$('[name="additem"]').on('click', function(e) {
		$('*').removeClass("error");	
        errorStatusHandle.html("");
	    if(!isValidData()){
	    	e.preventDefault();
        	return;    
        }   
	   	else {
e.preventDefault();
            var name_image = $("#product_image").val().toLowerCase();
  var form_data = new FormData($('form')[0]);
  form_data.append("product_image", document.getElementById("product_image").files[0]);
  name_image = name_image.replace(/^.*[\\\/]/, '');
  var toDisplay = "<img src=\"http://jadran.sdsu.edu/~jadrn032/abcxyz/" + name_image + "\" />";
        $.ajax({

          url: "/perl/jadrn032/session_cookies/upload.cgi",
          type: "post",
          data: form_data,
          processData: false,
          contentType: false,
          success: function(septe) {
          var name_image = $("#product_image").val().toLowerCase();
          name_image = name_image.replace(/^.*[\\\/]/, '');


            var sku= document.getElementById("sku").value;
            var category = document.getElementById("category").value;
            var vendor = document.getElementById("vendor").value;
            var mid = document.getElementById("mid").value;
            var description = document.getElementById("description").value;
            var features = document.getElementById("features").value;
            var cost=document.getElementById("cost").value;
            var retail=document.getElementById("retail").value;
            var qty = document.getElementById("qty").value;
            var product_image = document.getElementById("product_image").value;         

            var url = "/perl/jadrn032/session_cookies/add.cgi";
            url += "&sku="+ sku +"&category="+category+"&vendor="+vendor+"&mid="+mid+"&description="+description+"&features="+features+"&cost="+cost+"&retail="+retail+"&qty="+qty+"&product_image="+name_image;

          $('#pic').html(toDisplay);
          $.post("/perl/jadrn032/session_cookies/add.cgi", url, add_data);
        },
        error: function(septe) {
          $('#errormsg').html("An error occurred, please try again!");
          $("#errormsg").addClass("error");
          $("#errormsg").focus();
        }
      });  

    }  
 

    function add_data(septe) {
    var ans = $.trim(septe);
    if(ans === 'SUCCESS')
    {
      var msg ="Record added successfully!";
      $('#errormsg').text(msg);
      $("#category").val("0");
      $("#vendor").val("0");
      $("#mid").val("");
      $("#description").val("");
      $("#features").val("");
      $("#cost").val("");
      $("#retail").val("");
      $("#qty").val("");
      $("#product_image").val("");
      $('#sku').prop('disabled',false);
      $('#sku').val("");
      $('#sku').focus();
    }else
    {

      $('#errormsg').text("Record insertion failed!");
  }
}

  });

    $(':reset').on('click', function() {
    	errorStatusHandle.html("");
       	$('*').removeClass("error");
    });

    function isValidData() {
        if(isEmpty(elementHandle[0].val())) {
            elementHandle[0].addClass("error");
            errorStatusHandle.text("Please enter SKU of the product!");
            elementHandle[0].focus();
            return false;
            }

        else if(!isSkuFormat(elementHandle[0].val())) {
            elementHandle[0].addClass("error");
            errorStatusHandle.text("Please enter SKU in proper format!");
            elementHandle[0].focus();
            return false;	
        }

        if(elementHandle[1].val() == 0) {
            elementHandle[1].addClass("error");
            errorStatusHandle.text("Please select category of the product!");
            elementHandle[1].focus();
            return false;
            }

        if(elementHandle[2].val() == 0) {
            elementHandle[2].addClass("error");
            errorStatusHandle.text("Please select vendor of the product!");
            elementHandle[2].focus();
            return false;
            }
        
        if(isEmpty(elementHandle[3].val())) {
            elementHandle[3].addClass("error");
            errorStatusHandle.text("Please enter Manufacturer's ID!");
            elementHandle[3].focus();
            return false;
            } 
        
        if(isEmpty(elementHandle[4].val())) {
            elementHandle[4].addClass("error");
            errorStatusHandle.text("Please enter description of the product!");
            elementHandle[4].focus();
            return false;
            }

        if(isEmpty(elementHandle[5].val())) {
            elementHandle[5].addClass("error");
            errorStatusHandle.text("Please enter features of the product!");
            elementHandle[5].focus();
            return false;
            }
        
        if(isEmpty(elementHandle[6].val())) {
            elementHandle[6].addClass("error");
            errorStatusHandle.text("Please enter cost of the product!");
            elementHandle[6].focus();
            return false;
        }

        else if(!$.isNumeric(elementHandle[6].val())) {
            elementHandle[6].addClass("error");
            errorStatusHandle.text("Error, numbers only!");
            elementHandle[6].focus();            
            return false;
            }

        if(isEmpty(elementHandle[7].val())) {
            elementHandle[7].addClass("error");
            errorStatusHandle.text("Please enter retail of the product!");
            elementHandle[7].focus();
            return false;
        }

        else if(!$.isNumeric(elementHandle[7].val())) {
            elementHandle[7].addClass("error");
            errorStatusHandle.text("Error, numbers only!");
            elementHandle[7].focus();            
            return false;
            }

        var retailval = 1.25*elementHandle[6].val();
		var ret= elementHandle[7].val();
		if(ret != retailval) {
        	elementHandle[7].addClass("error");
            errorStatusHandle.html("Retail should be 25% more than cost!");
            elementHandle[7].focus();
            return false; 
        }

        if(isEmpty(elementHandle[8].val())) {
            elementHandle[8].addClass("error");
            errorStatusHandle.text("Please enter quantity of the product!");
            elementHandle[8].focus();
            return false;
        }
        
        $('input[name="product_image"]').on('change',function(e) {
        size = this.files[0].size;
        });

        if(elementHandle[9].val() == "") {
               elementHandle[9].addClass("error");
               errorStatusHandle.text("Please select a file to upload!");  
               elementHandle[9].focus();
               return false;
            }

         return true;
        }

       elementHandle[0].on('keyup', function() {
        elementHandle[0].val(elementHandle[0].val().toUpperCase());
        });
      
});
////Check dup SKU///
$(document).ready(function() { 
    
    $('#sku').on('blur', function() {
        var sku = $('#sku').val();
        if(!sku) return;
        var url = "/perl/jadrn032/session_cookies/check_dup.cgi?sku="+sku;
        $.get(url, process_reply);
    });
    
    $('#sku').on('focus', function() {
        $('#status').text("");
    });
    
    $('#sku').on('focus', function() {
        var sku = $('#sku').val("");    
    });
  });
   
function process_reply(septe) {
    $('#status').text("");
    $('#status').show();
    if(septe == "OK") 
        $('#status').text("OK, not a duplicate record!");   
    else 
        $('#status').text("ERROR, duplicate record!");
    setTimeout(clearStatus, 2000);
    }
    
function clearStatus() {    
    $('#status').fadeOut(1000);
    $('#status_edit').fadeOut(1000);
    $('#status_del').fadeOut(1000);
    }
////Check dup SKU end///

///Edit form///
$(document).ready(function() {  

    var errorStatusHandle = $('[name="errormsg_edit"]');
    var elementHandle = new Array(10);
    elementHandle[10] = $('[name="sku_edit"]');
    elementHandle[11] = $('[name="category_edit"]');
    elementHandle[12] = $('[name="vendor_edit"]');
    elementHandle[13] = $('[name="mid_edit"]');
    elementHandle[14] = $('[name="description_edit"]');
    elementHandle[15] = $('[name="features_edit"]');
    elementHandle[16] = $('[name="cost_edit"]');
    elementHandle[17] = $('[name="retail_edit"]');
    elementHandle[18] = $('[name="qty_edit"]');
    elementHandle[19] = $('[name="product_image_edit"]');
    elementHandle[10].focus();
    

    $('[name="edititem"]').on('click', function(e) {
  
        $('*').removeClass("error");    
        errorStatusHandle.html("");
        if(!isValidData1()){
            e.preventDefault();
            return;    
        }   
        else {

            e.preventDefault();
            var new_name = $("#product_image_edit").val().toLowerCase();
  var form_data = new FormData($('form')[0]);



        $.ajax({
          url: "/perl/jadrn032/session_cookies/upload.cgi",
          type: "post",
          data: form_data,
          processData: false,
          contentType: false,
          success: function(septe) {
          var new_name = $("#product_image_edit").val().toLowerCase();
          new_name = new_name.replace(/^.*[\\\/]/, '');
    
            // var sku= document.getElementById("sku_edit").value;
            // var category = document.getElementById("category_edit").value;
            // var vendor = document.getElementById("vendor_edit").value;
            // var mid = document.getElementById("mid_edit").value;
            // var description = document.getElementById("description_edit").value;
            // var features = document.getElementById("features_edit").value;
            // var cost=document.getElementById("cost_edit").value;
            // var retail=document.getElementById("retail_edit").value;
            // var qty = document.getElementById("qty_edit").value;
            // var product_image = document.getElementById("product_image_edit").value; 

          $('#epic').html(toDisplay);
          $.post("/perl/jadrn032/session_cookies/", param, edit_data);
        },
   
    error: function(septe) {
        if(img_name==''){

            alert("null");
        }
        else{
            $('#status_edit').html("Sorry, error occurred! Please try again.");

        }  
    }  
});


    }   
    function edit_data(septe) {
    alert("hi");
    var ans = $.trim(septe);
    if(ans === 'SUCCESS')
    {

      var msg = "Record updated successfully!";
      $('#errormsg_edit_edit').text(msg);
      $("#category_edit").val("0");
      $("#vendor_edit").val("0");
      $("#mid_edit").val("");
      $("#description_edit").val("");
      $("#features_edit").val("");
      $("#cost_edit").val("");
      $("#retail_edit").val("");
      $("#qty_edit").val("");
      $("#product_image_edit").val("");
      $('#sku_edit').prop('disabled',false);
      $('#sku_edit').val("");
      $('#sku_edit').focus();
    }else
    {

      $('#errormsg_edit').text("Insertion Failed");
    alert(septe);
  }
}

  }); 

$(':reset').on('click', function() {
        errorStatusHandle.html("");
        $('*').removeClass("error");
    });
    function isValidData1() {
        if(isEmpty(elementHandle[10].val())) {
            elementHandle[10].addClass("error");
            errorStatusHandle.text("Please enter SKU of the product!");
            elementHandle[10].focus();
            return false;
            }
        else if(!isSkuFormat(elementHandle[10].val())) {
            elementHandle[10].addClass("error");
            errorStatusHandle.text("Please enter SKU in proper format!");
            elementHandle[10].focus();
            return false;   
        }
        if(elementHandle[11].val() == 0) {
            elementHandle[11].addClass("error");
            errorStatusHandle.text("Please select a category!");
            elementHandle[11].focus();
            return false;
            }
        if(elementHandle[12].val() == 0) {
            elementHandle[12].addClass("error");
            errorStatusHandle.text("Please select a vendor of the product!");
            elementHandle[12].focus();
            return false;
            }       
        if(isEmpty(elementHandle[13].val())) {
            elementHandle[13].addClass("error");
            errorStatusHandle.text("Please enter Manufacturer's ID!");
            elementHandle[13].focus();
            return false;
            }         
        if(isEmpty(elementHandle[14].val())) {
            elementHandle[14].addClass("error");
            errorStatusHandle.text("Please enter description!");
            elementHandle[14].focus();
            return false;
            }
        if(isEmpty(elementHandle[15].val())) {
            elementHandle[15].addClass("error");
            errorStatusHandle.text("Please enter features!");
            elementHandle[15].focus();
            return false;
            }       
        if(isEmpty(elementHandle[16].val())) {
            elementHandle[16].addClass("error");
            errorStatusHandle.text("Please enter cost!");
            elementHandle[16].focus();
            return false;
        }
        else if(!$.isNumeric(elementHandle[16].val())) {
            elementHandle[16].addClass("error");
            errorStatusHandle.text("Error, numbers only!");
            elementHandle[16].focus();            
            return false;
            }
        if(isEmpty(elementHandle[17].val())) {
            elementHandle[17].addClass("error");
            errorStatusHandle.text("Please enter retail of the product!");
            elementHandle[17].focus();
            return false;
        }
        else if(!$.isNumeric(elementHandle[17].val())) {
            elementHandle[17].addClass("error");
            errorStatusHandle.text("Error, numbers only!");
            elementHandle[17].focus();            
            return false;
            }
        var retailval = 1.25*elementHandle[16].val();
        var ret= elementHandle[17].val();
        if(ret < retailval) {
            elementHandle[17].addClass("error");
            errorStatusHandle.html("Retail should be 25% more than cost!");
            elementHandle[17].focus();
            return false; 
        }
        if(isEmpty(elementHandle[18].val())) {
            elementHandle[18].addClass("error");
            errorStatusHandle.text("Please enter the quantity!");
            elementHandle[18].focus();
            return false;
        }       
        $('input[name="product_image_edit"]').on('change',function(e) {
        size = this.files[0].size;
        });
        if(elementHandle[19].val() == "") {
               elementHandle[19].addClass("error");
               errorStatusHandle.text("Please select a file to upload!");  
               elementHandle[19].focus();
               return false;
            }       
        return true;
}

        elementHandle[10].on('keyup', function() {
        elementHandle[10].val(elementHandle[10].val().toUpperCase());
        });

    $('#sku_edit').on('blur', function() {
        var sku = $('#sku_edit').val();
        if(!sku) return;
        var url = "/perl/jadrn032/session_cookies/check_dup.cgi?sku="+sku;
        $.get(url, edit_process);
    });
    
    $('#sku_edit').on('focus', function() {
        $('#errormsg_edit').text("");
    });
    
    $('#sku_edit').on('focus', function() {
        var sku = $('#sku_edit').val("");    
    });
  });
    
  
function edit_process(septe) {
    
    if(septe == "OK") 
        $('#status_edit').text("This SKU does not exist!");   
    else if(septe == "DUPLICATE") 
    {
        var sku = $("#sku_edit").val();         
        $('#edititem').prop('disabled',false);
        $('#sku_edit').prop('disabled',true);

        var sku = $("#sku_edit").val();
        edit_data(sku);
        }
    }

function edit_data(sku) {
 $.ajax({
    type: 'POST',
    url: '/perl/jadrn032/session_cookies/getdata.cgi ',
    data: {'sku': sku},
    success: function(sept) {
        $('#status_edit').html("Record found!");
        setTimeout(clearStatus, 2000);
        sept=sept.split("=");

        document.getElementById('category_edit').value =  parseInt(sept[1]);
        document.getElementById('vendor_edit').value =  parseInt(sept[2]);
        document.getElementById('mid_edit').value =  sept[3];
        document.getElementById('description_edit').value =  sept[4];
        document.getElementById('features_edit').value =  sept[5];
        document.getElementById('cost_edit').value =  parseFloat(sept[6]);
        document.getElementById('retail_edit').value =  parseFloat(sept[7]);
        document.getElementById('qty_edit').value =  parseFloat(sept[8]);
        document.getElementById('product_image_edit').value = sept[9];
        document.getElementById('pic_edit').innerHTML = "<img src=\"http://jadran.sdsu.edu/~jadrn032/abcxyz/"+sept[9]+"\"  />";
    },
    error: function(sept) {
        $('#errormsg_edit').html("Sorry, an error occurred");
    }
});
}
///Edit form end///

    ///Delete data///

$(document).ready(function() {  

    var errorStatusHandle = $('[name="errormsg_del"]');
    var elementHandle = new Array(10);
    elementHandle[20] = $('[name="sku_del"]');
    elementHandle[21] = $('[name="category_del"]');
    elementHandle[22] = $('[name="vendor_del"]');
    elementHandle[23] = $('[name="mid_del"]');
    elementHandle[24] = $('[name="description_del"]');
    elementHandle[25] = $('[name="features_del"]');
    elementHandle[26] = $('[name="cost_del"]');
    elementHandle[27] = $('[name="retail_del"]');
    elementHandle[28] = $('[name="qty_del"]');
    elementHandle[29] = $('[name="product_image_del"]');
    elementHandle[20].focus();
    

    $('[name="delitem"]').on('click', function(e) {
  
        $('*').removeClass("error");    
        errorStatusHandle.html("");
        if(!isValidData2()){
            e.preventDefault();
            return;    
        }   
        else {
                 var sku = document.getElementById('sku_del').value;
        var message = "";
        $.ajax({
            type: 'POST',
            url: '/perl/jadrn032/session_cookies/delete.cgi',
            data: {'sku': sku},
            success: function(sept1) {
                $('#errormsg_del').text("Data deleted successfully");
            },
            error: function(sept1) {
                $('#errormsg_del').text("Done!");
            }  
            });     
      }
  }); 
$(':reset').on('click', function() {
        errorStatusHandle.html("");
        $('*').removeClass("error");
    });
    function isValidData2() {
        if(isEmpty(elementHandle[20].val())) {
            elementHandle[20].addClass("error");
            errorStatusHandle.text("Please enter SKU of the product!");
            elementHandle[20].focus();
            return false;
            }
        else if(!isSkuFormat(elementHandle[20].val())) {
            elementHandle[20].addClass("error");
            errorStatusHandle.text("Please enter SKU in proper format!");
            elementHandle[20].focus();
            return false;   
        }
        if(elementHandle[21].val() == 0) {
            elementHandle[21].addClass("error");
            errorStatusHandle.text("Please select a category!");
            elementHandle[21].focus();
            return false;
            }
        if(elementHandle[22].val() == 0) {
            elementHandle[22].addClass("error");
            errorStatusHandle.text("Please select vendor of the product!");
            elementHandle[22].focus();
            return false;
            }       
        if(isEmpty(elementHandle[23].val())) {
            elementHandle[23].addClass("error");
            errorStatusHandle.text("Please enter Manufacturer's ID!");
            elementHandle[23].focus();
            return false;
            }         
        if(isEmpty(elementHandle[24].val())) {
            elementHandle[24].addClass("error");
            errorStatusHandle.text("Please enter description!");
            elementHandle[24].focus();
            return false;
            }
        if(isEmpty(elementHandle[25].val())) {
            elementHandle[25].addClass("error");
            errorStatusHandle.text("Please enter features!");
            elementHandle[25].focus();
            return false;
            }       
        if(isEmpty(elementHandle[26].val())) {
            elementHandle[26].addClass("error");
            errorStatusHandle.text("Please enter cost!");
            elementHandle[26].focus();
            return false;
        }
        else if(!$.isNumeric(elementHandle[26].val())) {
            elementHandle[26].addClass("error");
            errorStatusHandle.text("Error, numbers only!");
            elementHandle[26].focus();            
            return false;
            }
        if(isEmpty(elementHandle[27].val())) {
            elementHandle[27].addClass("error");
            errorStatusHandle.text("Please enter retail of the product!");
            elementHandle[27].focus();
            return false;
        }
        else if(!$.isNumeric(elementHandle[27].val())) {
            elementHandle[27].addClass("error");
            errorStatusHandle.text("Error, numbers only!");
            elementHandle[27].focus();            
            return false;
            }
        var retailval = 1.25*elementHandle[26].val();
        var ret= elementHandle[27].val();
        if(ret < retailval) {
            elementHandle[27].addClass("error");
            errorStatusHandle.html("Retail should be 25% more than cost!");
            elementHandle[27].focus();
            return false; 
        }
        if(isEmpty(elementHandle[28].val())) {
            elementHandle[28].addClass("error");
            errorStatusHandle.text("Please enter the quantity!");
            elementHandle[28].focus();
            return false;
        }           
        return true;
}
        elementHandle[20].on('keyup', function() {
        elementHandle[20].val(elementHandle[20].val().toUpperCase());
        });
    
    $('#sku_del').on('blur', function() {
        var sku = $('#sku_del').val();
        if(!sku) return;
        var url = "/perl/jadrn032/session_cookies/check_dup.cgi?sku="+sku;
        $.get(url, del_process);
    });
    
    $('#sku_del').on('focus', function() {
        $('#status_del').text("");
    });
    
    $('#sku_del').on('focus', function() {
        var sku = $('#sku_del').val("");    
    });
  });
    
  
function del_process(septe) {  
    if(septe == "OK") 
        $('#status_del').text("This SKU does not exist!");   
    else if(septe == "DUPLICATE") 
    {
        var sku = $("#sku_del").val();         
        $('#delitem').prop('disabled',false);
        $('#sku_del').prop('disabled',true);
        var sku = $("#sku_del").val();
        del_data(sku);
        }
    }

function del_data(sku) {
 $.ajax({
    type: 'POST',
    url: '/perl/jadrn032/session_cookies/getdata.cgi ',
    data: {'sku': sku},
    success: function(sept1) {
        $('#status_del').html("Record found!");
        setTimeout(clearStatus, 2000);
        sept1=sept1.split("=");

        document.getElementById('category_del').value =  parseInt(sept1[1]);
        document.getElementById('vendor_del').value =  parseInt(sept1[2]);
        document.getElementById('mid_del').value =  sept1[3];
        document.getElementById('description_del').value =  sept1[4];
        document.getElementById('features_del').value =  sept1[5];
        document.getElementById('cost_del').value =  parseFloat(sept1[6]);
        document.getElementById('retail_del').value =  parseFloat(sept1[7]);
        document.getElementById('qty_del').value =  parseFloat(sept1[8]);
        document.getElementById('product_image_del').value = sept1[9];
        document.getElementById('pic_del').innerHTML = "<img src=\"http://jadran.sdsu.edu/~jadrn032/abcxyz/"+sept1[9]+"\"  />";
    },
    error: function(sept1) {
        $('#errormsg_del').html("Sorry, an error occurred");
    }
});
}
///Delete data end///