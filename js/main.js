
// http://patorjk.com/software/taag
var welcomeMessage = String.raw`
   _____                                       __    __    __   
  /  _  \   ____  __ ______________     ____   \ \   \ \   \ \  
 /  /_\  \ /    \|  |  \_  __ \__  \   / ___\   \ \   \ \   \ \ 
/    |    \   |  \  |  /|  | \// __ \_/ /_/  >  / /   / /   / / 
\____|__  /___|  /____/ |__|  (____  /\___  /  /_/   /_/   /_/  
        \/     \/                  \//_____/                    `


$(document).ready(function() {

  var container = $('<div class="console">');
  $('body').append(container);
  var controller = container.console({
    promptLabel: 'arbsh> ',
    autofocus: true,
    welcomeMessage: welcomeMessage,
    commandHandle: function(line) {
      line = $.trim(line);
      if (line == "") {
        return "";
      }
      var split = line.split(/\ +/);
      var command = split[0];
      var args = split.slice(1);

      var files = ["hello.txt", "contact.txt"];
      var links = ["Resume", "Github", "LinkedIn"];
      
      var msg = "";
      var error = false;
      if (command == "ls") {

        if (args.length > 0) {
          error = true;
          msg = "ls does not take any arguments.";
        } else {
          msg = files.join(" ") + " " + links.join(" ");
        }

      } else if (command == "cat") {

        if (args.length == 0) {
          error = true;
          msg = "Please pass in a file to cat.";
        } else if (args.length > 1) {
          error = true;
          msg = "Too many arguments to cat.";
        }
        else {
          var file = args[0];
          if (files.includes(file)) {
            if (file == "hello.txt") {
              msg = "Hello, my name is Anurag Baddam, and I'm a software engineer currently working at Salesforce. I graduated from UC Berkeley, where I studied Computer Science and Statistics. My fields of interest include Data Science, Machine Learning, and Computer Security, but I mostly just like building cool things! Welcome to my website/shell where you can learn everything about me! Try typing 'ls' to see what files there are for you to play with and try 'help' if you're stuck.";
            } else if (file == "contact.txt") {
              msg = "";
              msg += "-------------------------------------------------------\n";
              msg += "Anurag Baddam\n";
              msg += "Software Engineer at Salesforce\n";
              msg += "Email: baddamanu@gmail.com\n";
              msg += "Phone: (813) 523 1555\n";
              msg += "LinkedIn: https://www.linkedin.com/in/anuragbaddam/\n";
              msg += "Github: https://github.com/arb625\n";
              msg += "-------------------------------------------------------\n";
            }
          } else if (links.includes(file)) {
            error = true;
            msg = "Seems like you tried to cat a link. Try 'open <link>' instead.";
          } else {
            error = true;
            msg = "No such file.";
          }
        }

      } else if (command == "open") {

        if (args.length == 0) {
          error = true;
          msg = "Please pass in a link to open.";
        } else if (args.length > 1) {
          error = true;
          msg = "Too many arguments to open.";
        }
        else {
          var link = args[0];
          if (links.includes(link)) {
            if (link == "Resume") {
              window.open("Resume.pdf");
            } else if (link == "Github") {
              window.open("https://github.com/arb625");
            } else if (link == "LinkedIn") {
              window.open("https://www.linkedin.com/in/anuragbaddam/");
            }
          } else if (files.includes(link)) {
            error = true;
            msg = "Seems like you tried to open a file. Try 'cat <file>' instead.";
          } else {
            error = true;
            msg = "No such link.";
          }
        }

      } else if (command == "help") {

        if (args.length > 1) {
          error = true;
          msg = "Too many arguments to help.";
        } else if (args.length == 0) {
          msg = "";
          msg += "The supported commands are:\n";
          msg += "ls cat open help\n";
          msg += "You can also get help for a specific command using 'help <command>'.\n";
          msg += "Try out 'cat hello.txt' or 'open Resume' to get started!";
        } else if (args.length == 1) {
          command = args[0];
          if (command == "ls") {
            msg = "ls: List all the files and links to explore.";
          } else if (command == "cat") {
            msg = "cat <filename>: Display the contents of a file.";
          } else if (command == "open") {
            msg = "open <link>: Open a link.";
          } else if (command == "help") {
            msg = "help [command]: Get general info or info about the usage of a specific command.";
          } else {
            error = true;
            msg = "No help found as that command does not exist.";
          }
        }

      } else if (command == "clear") {

        if (args.length > 0) {
          error = true;
          msg = "clear does not take any arguments.";
        } else {
          msg = "Please press Ctrl+L to clear the console.";
        }

      } else {
        error = true;
        msg = "Sorry, that command is not supported. Try typing 'help' to see the list of supported commands.";
      }
      var class_name = null
      if (error) {
        class_name = "jquery-console-error-value"
      } else {
        class_name = "jquery-console-message-value" 
      }
      return [{msg: msg, className: class_name}]
    },
  });

});

var konami_input = ""
var konami_pattern = "38384040373937396665"

function checkKonamiCode(e) {
  konami_input += e ? e.keyCode : event.keyCode;
  if (konami_input.length > konami_pattern.length) {
      konami_input = konami_input.substr((konami_input.length - konami_pattern.length));
  }
  if (konami_input === konami_pattern) {
      window.location.href = 'https://www.facebook.com/anurag.baddam';
      konami_input = "";
      e.preventDefault();
      return false;
  }
}

document.addEventListener('keydown', checkKonamiCode, true);
