$(document).ready(function(){
  $("#screen_h1").html("0");
  $("#screen_h6").html("0"); 
  
  var overflow = false;  
  var evaluated = false;

    function check_overflow_or_zero_or_evaluated(){
      if(overflow || evaluated || $("#screen_h1").html() === "0"){
        $("#screen_h1").html("");
        $("#screen_h6").html("");
        overflow = false;
        evaluated = false;
      }
    }
  
    function check_operator(){
      if($("#screen_h1").html() === "/" || $("#screen_h1").html() === "X" || $("#screen_h1").html() === "+" || $("#screen_h1").html() === "-"){
        $("#screen_h1").html("");
      }
    }  
    
  function check_h1_length(){
      if($("#screen_h1").html().length > 8) {
        $("#screen_h1").html("0");
        $("#screen_h6").html("DIGIT LIMIT MET");
        overflow = true;
      }
  }
  
  function print_value(value){
   check_overflow_or_zero_or_evaluated();
   check_operator();
   $("#screen_h1").html($("#screen_h1").html() + value);
   $("#screen_h6").html($("#screen_h6").html() + value);    
   check_h1_length();     
  }
  
  function print_operator(operator){
    if($("#screen_h1").html() !== "/" && $("#screen_h1").html() !== "X" && $("#screen_h1").html() !== "+" && $("#screen_h1").html() !== "-" ){
      if(evaluated){
        $("#screen_h6").html($("#screen_h1").html());
        evaluated = false;
      }
      $("#screen_h6").html($("#screen_h6").html() + operator);    
      $("#screen_h1").html(operator);
    }
  }  
  
  
  $("#button-AC").click(function(){
    $("#screen_h1").html("0");
    $("#screen_h6").html("0");    
  });
  
  $("#button-CE").click(function(){
    
    // CONDITION 1 - if evaluated = true ==> h1 = 0; h6 = 0    
    if(evaluated){                  
      console.log("CONDITION 1");
      $("#screen_h1").html("0");
      $("#screen_h6").html("0");
      evaluated = false;
      
    // CONDITION 2 - if no operator in h6 (only a number) ==> h1 = 0; h6 = 0      
    }else if(! /[\+\-\/X]/.test($("#screen_h6").html())){       
      console.log("CONDITION 2");      
      $("#screen_h1").html("0");
      $("#screen_h6").html("0");
      
    // CONDITION 3 - if last character in h6 is an operator ==> delete operator; h6 = h6 less the operator; h1 = h6      
    }else if(/[\+\-\/X]$/.test($("#screen_h6").html())){   
      console.log("CONDITION 3");      
      $("#screen_h6").html($("#screen_h6").html().substring(0,$("#screen_h6").html().length -1));
      $("#screen_h1").html($("#screen_h6").html());
    
    // CONDITION 4 - if last character in h6 is "." ==> delete last character in h1 and h6 and recall button-CE.click      
    }else if(/[\.]$/.test($("#screen_h6").html())){   
      console.log("CONDITION 4");      
      $("#screen_h6").html($("#screen_h6").html().substring(0,$("#screen_h6").html().length -1));
      $("#screen_h1").html($("#screen_h6").html());
      $("#button-CE").click();
      
    // CONDITION 5 - if last character in h6 is NOT an operator (is a number) ==> h1 = the last operator; h6 = delete the last number (come back to last step)      
    }else if(! /[\+\-\/X]$/.test($("#screen_h6").html())){ 
      
      //find last operator
      var str =  $("#screen_h6").html();
      var arr = str.split("");
      var  operator = "";
      var index = 0;
      for(index = arr.length - 1; index >= 0; index--){
        if(arr[index] === "/" || arr[index] === "X" || arr[index] === "+" || arr[index] === "-" ){
          operator = arr[index];
          break;
           }     
      }
      str = str.substring(0, index + 1);
      $("#screen_h1").html(operator);
      $("#screen_h6").html(str);       
    }  
  });
  
  $("#button-divi").click(function(){
    if(!overflow){
      print_operator("/");       
    }
  });
  
  $("#button-multi").click(function(){
    if(!overflow){
      print_operator("X");       
    }
  });
  
  $("#button-7").click(function(){
   print_value("7");
  });
  
  $("#button-8").click(function(){
   print_value("8");
  });
  
  $("#button-9").click(function(){
   print_value("9");
  });
  
  $("#button-minus").click(function(){
    if(!overflow){
      print_operator("-");       
    }
  });
  
  $("#button-4").click(function(){
   print_value("4");
  });
  
  $("#button-5").click(function(){
   print_value("5");
  });
  
  $("#button-6").click(function(){
   print_value("6");
  });
  
  $("#button-plus").click(function(){
    if(!overflow){
      print_operator("+");       
    }
  });
  
  $("#button-1").click(function(){
   print_value("1");
  });
  
  $("#button-2").click(function(){
   print_value("2");
  });
  
  $("#button-3").click(function(){
   print_value("3");
  });
  
  $("#button-zero").click(function(){
   // Avoid division by 0 
   if($("#screen_h1").html() !== "/") { 
    print_value("0");
  }
  });
  
  $("#button-decimal").click(function(){
    
    // CONDITION 1 - overflow = true ==> h1 = "0."; h6 = "0." overflow = false;  
    if(overflow){
        $("#screen_h1").html("0.");
        $("#screen_h6").html("0.");
        overflow = false;
        console.log(2);
    // CONDITION 2 - evaluated = true ==> h1 = "0."; h6 = "0." evaluated = false;    
    }else if(evaluated){
        $("#screen_h1").html("0.");
        $("#screen_h6").html("0.");
        evaluated = false;    
            console.log(3);
    // CONDITION 3 - h1 already contains "." ==> do nothing!;
    }else if(/[\.]/.test($("#screen_h1").html())){
    
    // CONDITION 4 - h1 = number ==> h1 = number + "."; h6 = number + "." (remember to check "." when "=" is pressed);
    }else if(! /[\+\-\/X]$/.test($("#screen_h1").html())){
        $("#screen_h1").html($("#screen_h1").html() + ".");
        $("#screen_h6").html($("#screen_h6").html() + ".");              
            console.log(4);
    // CONDITION 5 - h1 = operator ==> h1 = number + "0."; h6 = h6 + "0." (remember to check "0." when "=" is pressed);
    }else if(/[\+\-\/X]$/.test($("#screen_h6").html())){
        $("#screen_h1").html("0.");
        $("#screen_h6").html($("#screen_h6").html() + "0."); 
              console.log(5);
    }
  });
  
  $("#button-equal").click(function(){
   var value = eval($("#screen_h6").html().replace("X","*"));
   value = value.toFixed(8).replace(/[0\.]+$/, "");
   $("#screen_h1").html(1*value);
   $("#screen_h6").html($("#screen_h6").html() + "=" + $("#screen_h1").html() );
   evaluated = true;
   //check_h1_length()
  });
  
  
    
  
});