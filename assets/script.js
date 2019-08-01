$(document).ready(function() {
console.log("doc rdy");

    firebaseConfig = {
    apiKey: "AIzaSyAE_kK4KETlCIkR-wgPRUDpboCUy6x8mmY",
    authDomain: "derekm-f0f45.firebaseapp.com",
    databaseURL: "https://derekm-f0f45.firebaseio.com",
    projectId: "derekm-f0f45",
    storageBucket: "",
    messagingSenderId: "725394264000",
    appId: "1:725394264000:web:0d869d3b05accff2"
  };
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();

    var trainName;
    var firstTrain;
    var frequency;
    var destination;

  $(".train-form").on("submit", function () {
    event.preventDefault();
    console.log("train form submitted");
     
    trainName = $(".train-name-input").val().trim();
    firstTrain = $(".first-train-input").val().trim();
    frequency = $(".frequency-input").val().trim();
    destination = $(".destination-input").val().trim();

    var trainObject = {
        name: trainName,
        first: firstTrain,
        frequency: frequency,
        destination: destination,
}
        database.ref().push(trainObject);
        $(".form-control").val("");
  })


  database.ref().on("child_added", function(ohSnap) {
      event.preventDefault();
      
      console.log("child added")
      
    var sv = ohSnap.val();
      

    //Plug in snapshot values, display first train time. 
    //calculate minutes apart from first train. 
    //
    var tFrequency = parseInt(sv.frequency);
    var firstTime = sv.first;
    var firstTimeConverted = moment(firstTime, "H HH").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var trainRow = $("<tr>").addClass("train-row");
        console.log(ohSnap.val().name);
        console.log("example:sv: " + sv.name);

        trainRow.append(
        $("<td>").text(sv.name),
        $("<td>").text(sv.destination),
        $("<td>").text(sv.first),
        $("<td>").text(sv.frequency + " minutes"),
        $("<td>").text(tMinutesTillTrain + " minutes"));
    
        $(".t-body").append(trainRow);
  })




})