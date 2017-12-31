// Set 4 digit non repeat random number
var numbers = [0,1, 2, 3, 4,5,6,7,8,9];

function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

var valString = shuffle(numbers).slice(0,4).toString().replace(/,/g, '');

console.log(valString)

// On keypress validate length, repitition and numericality of input
$("input").on("keypress", function(e){
    
    if(e.which === 13){

      // Set textInput equal to input value
      var textInput = $("input").val()

      // Set validation variables
      var checkIfNum = isNaN(textInput)

      var checkLength = textInput.length != 4;

      var checkRepeat = textInput.split("").some(function(v,i,a){
         return a.lastIndexOf(v)!=i;
       });

      // Set validation function
      function validate(){
        return checkLength || checkRepeat || checkIfNum
      }

      // If validations don't pass add has-error class
      if(validate()) {
        $(".user").addClass("has-error")
        $("#red-span").css("color", "red")
      }

      // Else remove has-error class and invoke calculation function
      else {
        $(".user").removeClass("has-error")
        $("#red-span").css("color", "navy")
        result = calculation(valString, textInput)

        // Append result returned by calculation function
        $("table tr:first").after('<tr><td>' + textInput + '</td><td>' + result[0] + '</td><td>' + result[1] + '</td></tr>')
      }

    }
  
})

// Calculation function
function calculation(target, shoot){
  var fijas = 0
  var picas = 0

  for (var i = 0; i < target.length; i++) {
    if(shoot[i] === target[i]) {
      fijas += 1
    }    
  }

  for (var i = 0; i < target.length; i++) {
    if (target.indexOf(shoot[i]) > -1 && shoot[i] !== target[i]) {
      picas +=1
    }
  }

  if(fijas === 4) {
    $.confirm({
    title: 'Ganaste!',
    content: 'Quieres jugar de nuevo?',
    buttons: {
        confirm: reset,
        cancel: function () {
          //Do nothing
        },
      }
    });
  }

  return [picas, fijas]
}

// Reset function
function reset (){
  valString = shuffle(numbers).slice(0,4).toString().replace(/,/g, '');
  console.log(valString)
  $("input").val("")
  $("td").remove();
}





