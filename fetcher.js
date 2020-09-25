const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout
});




const downloadComplete = (body) => {
  console.log("File downloaded successfully");
  process.exit();
}

const fileDownload = function(arguments) {
  request(arguments[2],(error,response,body) => {

  if(error) {
    console.log(`File Cannot be downloaded ${error}`);
  } else {
    switch (response && response.statusCode) {
     case 200 : 
     fs.writeFile(arguments[3],body,(error,data) =>{
      if (!error) downloadComplete(data);
     }); 
     break;

     case 404 : console.log("Resource Not Found");
     break;

     case 500 : console.log("Server had an Error");
     break;
    }
  }
  

})
};

const arguments = process.argv;

fs.exists(arguments[3], (exists) => {
  if(exists) {
    
    rl.question("The File already exists, Do you want to overwrite it ? Press Y to overwrite", (answer) => {
      if(answer === 'Y') {        
        fileDownload(arguments);
      } else {
        process.exit();
      }
      rl.close();
    });
    

  } else {
    fileDownload(arguments);
  }
});


